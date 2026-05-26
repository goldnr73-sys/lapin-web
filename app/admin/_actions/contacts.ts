'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { ContactStatus } from '@/types'

export async function updateContactStatus(id: string, status: ContactStatus): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('contacts')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('updateContactStatus error:', error)
    throw new Error('상태 변경에 실패했습니다.')
  }

  revalidatePath('/admin')
}
