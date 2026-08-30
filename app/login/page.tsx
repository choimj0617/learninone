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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '40px' }}>
      <h1>로그인</h1>
      <button onClick={handleGoogleLogin}>구글로 로그인</button>
      <button onClick={handleKakaoLogin}>카카오로 로그인</button>
    </div>
  )
}