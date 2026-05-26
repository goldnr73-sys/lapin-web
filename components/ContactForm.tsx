'use client'

import { useState } from 'react'
import type { ContactFormData } from '@/types'

const initialForm: ContactFormData = { name: '', email: '', phone: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? '오류가 발생했습니다. 다시 시도해 주세요.')
        return
      }

      setSuccess(true)
      setForm(initialForm)
    } catch {
      setError('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-8 text-center">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-apple-black">문의가 접수되었습니다</h3>
        <p className="mt-2 text-sm text-apple-gray">24시간 내에 연락드리겠습니다.</p>
        <button
          className="mt-6 text-sm text-apple-blue hover:underline"
          onClick={() => setSuccess(false)}
        >
          추가 문의하기
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-8 space-y-5"
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-apple-black mb-1.5">
          이름 <span className="text-apple-blue">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="홍길동"
          className="w-full rounded-xl border border-gray-200 bg-apple-light px-4 py-3 text-sm text-apple-black placeholder:text-gray-400 focus:outline-none focus:border-apple-blue focus:bg-white transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-apple-black mb-1.5">
          이메일 <span className="text-apple-blue">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="hello@example.com"
          className="w-full rounded-xl border border-gray-200 bg-apple-light px-4 py-3 text-sm text-apple-black placeholder:text-gray-400 focus:outline-none focus:border-apple-blue focus:bg-white transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-apple-black mb-1.5">
          연락처 <span className="text-apple-gray text-xs font-normal">(선택)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="010-0000-0000"
          className="w-full rounded-xl border border-gray-200 bg-apple-light px-4 py-3 text-sm text-apple-black placeholder:text-gray-400 focus:outline-none focus:border-apple-blue focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-apple-black mb-1.5">
          문의 내용 <span className="text-apple-blue">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="어떤 사이트를 원하시는지 간략히 알려주세요."
          className="w-full rounded-xl border border-gray-200 bg-apple-light px-4 py-3 text-sm text-apple-black placeholder:text-gray-400 focus:outline-none focus:border-apple-blue focus:bg-white transition-colors resize-none"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-apple-blue text-white rounded-full py-3.5 text-sm font-medium hover:bg-apple-blue-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? '제출 중...' : '문의 보내기'}
      </button>
    </form>
  )
}
