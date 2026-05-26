import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validateContactForm } from '@/lib/validations'
import type { ContactFormData } from '@/types'

export async function POST(request: Request) {
  let body: ContactFormData

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const validationError = validateContactForm(body)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ error: '서버 설정 오류입니다.' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, anonKey)

  const { error } = await supabase.from('contacts').insert({
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone.trim() || null,
    message: body.message.trim(),
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: '저장 중 오류가 발생했습니다.' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
