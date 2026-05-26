import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let userEmail: string | undefined

  if (supabaseConfigured) {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect('/admin/login')
    }

    userEmail = user.email
  }

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-apple-light">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-apple-black tracking-tight">lapin</span>
            <span className="text-sm text-apple-gray">어드민</span>
          </div>
          <div className="flex items-center gap-4">
            {userEmail && (
              <span className="text-xs text-apple-gray hidden sm:block">{userEmail}</span>
            )}
            {supabaseConfigured && (
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="text-sm text-apple-gray hover:text-apple-black transition-colors"
                >
                  로그아웃
                </button>
              </form>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 md:px-12 py-8">{children}</main>
    </div>
  )
}
