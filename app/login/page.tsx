'use client'

import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const handleKakaoLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '80px auto',
        padding: '40px 32px',
        border: '1px solid #eee',
        borderRadius: 16,
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>로그인</h1>
      <p style={{ fontSize: 14, color: '#888', marginBottom: 32 }}>
        Note & Vault에서 필기를 공유하고 코인을 모아보세요
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={handleGoogleLogin}
          style={{
            padding: '12px 16px',
            borderRadius: 10,
            border: '1px solid #ddd',
            background: 'white',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          구글로 로그인
        </button>
        <button
          onClick={handleKakaoLogin}
          style={{
            padding: '12px 16px',
            borderRadius: 10,
            border: 'none',
            background: '#FEE500',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          카카오로 로그인
        </button>
      </div>
    </div>
  )
}