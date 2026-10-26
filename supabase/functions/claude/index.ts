// Supabase Edge Function "claude": proxy between DFG Finance OS and the Claude API.
// The Anthropic key lives only in this function's secrets (ANTHROPIC_API_KEY), never in the browser.
// Deploy: Supabase → Edge Functions → Deploy a new function → Via Editor → name "claude" → paste → Deploy.
// Secrets (both required): ANTHROPIC_API_KEY, and ALLOWED_EMAIL = the only account allowed to use it
// (the project URL and anon key are public in the app, so anyone could sign up and spend the key otherwise).
import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js@2";

const MODEL = "claude-haiku-5-5";
const MAX_INPUT_CHARS = 24000;   // the app sends short prompts; this caps what a stolen session could spend
const MAX_OUTPUT_TOKENS = 2000;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  // The anon key alone passes the gateway, so require a real signed-in user of this project
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
  });
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return json({ error: "Inicia sesión primero" }, 401);
  const allowed = (Deno.env.get("ALLOWED_EMAIL") ?? "").trim().toLowerCase();
  if (!allowed) return json({ error: "Falta el secreto ALLOWED_EMAIL (tu correo) en Supabase" }, 500);
  if ((user.email ?? "").toLowerCase() !== allowed) return json({ error: "Usuario no autorizado" }, 403);
  if (!Deno.env.get("ANTHROPIC_API_KEY")) return json({ error: "Falta el secreto ANTHROPIC_API_KEY en Supabase" }, 500);

  let body: { system?: unknown; user?: unknown };
  try { body = await req.json(); } catch { return json({ error: "JSON inválido" }, 400); }
  const system = String(body?.system ?? "").trim();
  const prompt = String(body?.user ?? "").trim();
  if (!prompt) return json({ error: "Mensaje vacío" }, 400);
  if (system.length + prompt.length > MAX_INPUT_CHARS) return json({ error: "Mensaje demasiado largo" }, 413);

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      output_config: { effort: "low" },   // short reflections and JSON commands: low effort is enough
      ...(system ? { system } : {}),
      messages: [{ role: "user", content: prompt }],
    });
    if (msg.stop_reason === "refusal") return json({ error: "Claude no respondió a esta solicitud" }, 422);
    const text = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    return json({ text, model: msg.model, usage: msg.usage });
  } catch (e) {
    if (e instanceof Anthropic.AuthenticationError) return json({ error: "API key inválida: revisa ANTHROPIC_API_KEY" }, 502);
    if (e instanceof Anthropic.RateLimitError) return json({ error: "Límite de uso de Claude, intenta en un minuto" }, 429);
    if (e instanceof Anthropic.APIError) return json({ error: "Claude respondió " + e.status + ": " + e.message }, 502);
    return json({ error: "No se pudo conectar con Claude" }, 502);
  }
});
