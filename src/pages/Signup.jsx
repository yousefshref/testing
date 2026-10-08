import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    // Sample only: carry the phone number to the OTP page via router state.
    navigate('/verify', { state: { phone: form.phone, name: form.name } })
  }

  const field =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg space-y-5">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
          <p className="mt-1 text-sm text-slate-500">Sign up and we'll send a code to your WhatsApp.</p>
        </div>

        <label className="block text-sm font-medium text-slate-700">
          Full name
          <input name="name" required value={form.name} onChange={onChange} className={`${field} mt-1`} placeholder="Jane Doe" />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Email
          <input name="email" type="email" required value={form.email} onChange={onChange} className={`${field} mt-1`} placeholder="jane@example.com" />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          WhatsApp number
          <input name="phone" type="tel" required value={form.phone} onChange={onChange} className={`${field} mt-1`} placeholder="01024667753" />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input name="password" type="password" required minLength={6} value={form.password} onChange={onChange} className={`${field} mt-1`} placeholder="••••••••" />
        </label>

        <button type="submit" className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition">
          Register
        </button>
      </form>
    </main>
  )
}
