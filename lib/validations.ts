import type { ContactFormData } from '@/types'

export function validateContactForm(data: ContactFormData): string | null {
  if (!data.name.trim()) return '이름을 입력해 주세요'
  if (!data.email.trim()) return '이메일을 입력해 주세요'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return '이메일 형식을 확인해 주세요'
  if (!data.message.trim()) return '문의 내용을 입력해 주세요'
  return null
}
