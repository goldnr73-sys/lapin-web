import { createClient } from '@/lib/supabase/server'
import AdminContactTable from '@/components/AdminContactTable'
import type { Contact } from '@/types'

export default async function AdminPage() {
  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseConfigured) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-apple-black" style={{ letterSpacing: '-0.02em' }}>
            문의 관리
          </h1>
        </div>
        <div className="bg-white rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-8 text-center">
          <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-apple-black">Supabase 연동 필요</h2>
          <p className="mt-2 text-sm text-apple-gray max-w-sm mx-auto">
            <code className="bg-apple-light px-1.5 py-0.5 rounded text-xs">.env.local</code>에
            Supabase URL과 Key를 입력하면 실제 문의 데이터가 표시됩니다.
          </p>
          <div className="mt-4 text-left bg-apple-light rounded-xl p-4 max-w-md mx-auto">
            <p className="text-xs font-mono text-apple-gray leading-6">
              NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co<br />
              NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
            </p>
          </div>
        </div>
      </div>
    )
  }

  const supabase = await createClient()
  const { data: contacts, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        <p>문의 데이터를 불러오지 못했습니다.</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    )
  }

  const newCount = (contacts as Contact[]).filter((c) => c.status === 'new').length

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl font-semibold text-apple-black"
          style={{ letterSpacing: '-0.02em' }}
        >
          문의 관리
        </h1>
        <p className="mt-1 text-sm text-apple-gray">
          전체 {contacts?.length ?? 0}건
          {newCount > 0 && (
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-0.5">
              신규 {newCount}건
            </span>
          )}
        </p>
      </div>
      <AdminContactTable contacts={(contacts as Contact[]) ?? []} />
    </div>
  )
}
