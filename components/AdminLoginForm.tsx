'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError('Supabase 환경변수가 설정되지 않았습니다. .env.local을 확인해 주세요.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('이메일 또는 비밀번호를 확인해 주세요.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-apple-light flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-apple-black tracking-tight">lapin</h1>
          <p className="mt-2 text-sm text-apple-gray">어드민 로그인</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-8 space-y-5"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-apple-black mb-1.5">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-apple-light px-4 py-3 text-sm text-apple-black focus:outline-none focus:border-apple-blue focus:bg-white transition-colors"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-apple-black mb-1.5">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-apple-light px-4 py-3 text-sm text-apple-black focus:outline-none focus:border-apple-blue focus:bg-white transition-colors"
              required
              autoComplete="current-password"
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
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}
