import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateOtp, sendWhatsappText } from '../api.js'

export default function VerifyOtp() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const phone = state?.phone

  const [otp, setOtp] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | verified
  const [message, setMessage] = useState('')
  const expected = useRef('')
  const sentOnce = useRef(false)

  // No phone number (page opened directly) -> back to signup.
  useEffect(() => {
    if (!phone) navigate('/', { replace: true })
  }, [phone, navigate])

  const sendOtp = async () => {
    setStatus('sending')
    setMessage('')
    try {
      const code = generateOtp()
      await sendWhatsappText({
        recipient: phone,
        body: `Your verification code is ${code}`,
      })
      expected.current = code
      setStatus('sent')
      setMessage(`Code sent to ${phone}`)
    } catch (err) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  // Send automatically once when the page opens (guarded for StrictMode double-run).
  useEffect(() => {
    if (phone && !sentOnce.current) {
      sentOnce.current = true
      sendOtp()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone])

  const onVerify = (e) => {
    e.preventDefault()
    if (otp === expected.current && expected.current) {
      setStatus('verified')
      setMessage('Phone verified. Welcome!')
    } else {
      setMessage('Incorrect code, try again.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <form onSubmit={onVerify} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg space-y-5">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Enter your code</h1>
          <p className="mt-1 text-sm text-slate-500">We sent a 6-digit code to {phone} on WhatsApp.</p>
        </div>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          inputMode="numeric"
          autoFocus
          placeholder="000000"
          className="w-full rounded-lg border border-slate-300 px-3 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />

        {message && (
          <p className={`text-sm ${status === 'error' ? 'text-red-600' : status === 'verified' ? 'text-green-600' : 'text-slate-600'}`}>
            {status === 'sending' ? 'Sending code…' : message}
          </p>
        )}

        <button
          type="submit"
          disabled={otp.length !== 6 || status === 'sending'}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-50"
        >
          Verify
        </button>

        <button
          type="button"
          onClick={sendOtp}
          disabled={status === 'sending'}
          className="w-full text-sm text-indigo-600 hover:underline disabled:opacity-50"
        >
          Resend code
        </button>
      </form>
    </main>
  )
}
