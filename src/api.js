// Converts Egyptian numbers to E.164 (+20...), which the API requires.
//   01023455435   -> +201023455435
//   201023455435  -> +201023455435
//   +201023455435 -> +201023455435
export function toE164Egypt(input) {
  const digits = String(input).replace(/\D/g, '')
  if (digits.startsWith('20')) return `+${digits}`
  if (digits.startsWith('0')) return `+20${digits.slice(1)}`
  return `+20${digits}`
}

// Sends a WhatsApp message through the Vite dev proxy (see vite.config.js),
// which adds the X-API-Key header server-side.
export async function sendWhatsappText({ recipient, body }) {
  const res = await fetch('/api/send-whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: import.meta.env.VITE_WHATSAPP_FROM,
      to: toE164Egypt(recipient),
      type: 'text',
      text: { body },
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Send failed (${res.status}) ${detail}`)
  }
  return res.json()
}

export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}