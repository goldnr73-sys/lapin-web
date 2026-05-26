export type ContactStatus = 'new' | 'read' | 'replied'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  status: ContactStatus
  created_at: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}
