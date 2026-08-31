import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/LogoutButton'

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid #eee',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: 'none', color: 'inherit' }}>
          Note & Vault
        </Link>
        <Link href="/notes" style={{ fontSize: 14, textDecoration: 'none', color: '#555' }}>
          필기 목록
        </Link>
        {user && (
          <Link href="/mypage" style={{ fontSize: 14, textDecoration: 'none', color: '#555' }}>
            마이페이지
          </Link>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {user ? (
          <>
            <span style={{ fontSize: 13, color: '#888' }}>
              {user.email ?? user.user_metadata?.full_name ?? '사용자'}님
            </span>
            <LogoutButton />
          </>
        ) : (
          <Link
            href="/login"
            style={{
              fontSize: 14,
              padding: '6px 14px',
              border: '1px solid #ddd',
              borderRadius: 20,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            로그인
          </Link>
        )}
      </div>
    </nav>
  )
}