// Cloudflare Pages Function: /api/chat
// Add OPENAI_API_KEY as a secret in Cloudflare Pages > Settings > Variables and Secrets.
const SYSTEM = `You are NoorSky Visa Experts' helpful customer-support assistant in India.
Help with general visa, passport and travel enquiries. Reply in the user's language (Hindi, Hinglish or English).
Ask concise follow-up questions when destination, nationality, purpose or travel dates are needed.
You may provide preliminary document-preparation guidance, but never present generic lists as official or complete country-specific requirements.
Do not invent visa fees, processing times, appointment availability, embassy rules, or approval odds. Requirements change; direct users to the relevant official government/embassy/VFS website for confirmation.
Never guarantee visa approval or claim affiliation with any embassy, government, consulate or visa centre. State that only the relevant authority decides.
Do not request passport numbers, passwords, OTPs, full bank details or sensitive document uploads in chat.
For personalised case review, payment, booking or human support, invite the user to WhatsApp +91 81603 80337 or email noorskyvisa@gmail.com.
NoorSky is based in Surat, Gujarat, India. Passport service fee information shown on the website is consultancy/service fee and should be confirmed with NoorSky; government charges may be separate.
Be friendly, practical, clear and concise.`;
export async function onRequestPost({ request, env }) {
  const cors = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  try {
    if (!env.OPENAI_API_KEY) return new Response(JSON.stringify({ error: "AI service is not configured." }), { status: 503, headers: cors });
    const body = await request.json();
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 12) {
      return new Response(JSON.stringify({ error: "Invalid chat messages." }), { status: 400, headers: cors });
    }
    const messages = body.messages.map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || "").slice(0, 1800)
    }));
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.35,
        max_tokens: 650,
        messages: [{ role: "system", content: SYSTEM }, ...messages]
      })
    });
    const result = await upstream.json();
    if (!upstream.ok) return new Response(JSON.stringify({ error: "AI provider request failed. Please try again later." }), { status: 502, headers: cors });
    const reply = result.choices?.[0]?.message?.content?.trim();
    if (!reply) return new Response(JSON.stringify({ error: "No answer was returned." }), { status: 502, headers: cors });
    return new Response(JSON.stringify({ reply }), { status: 200, headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Unable to process this message." }), { status: 500, headers: cors });
  }
}
