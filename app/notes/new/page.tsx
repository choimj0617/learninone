'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// MDEditor는 브라우저 전용이라 SSR 끄고 불러오기
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function NewNotePage() {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력해주세요.')
      return
    }

    setLoading(true)
    setError(null)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError('로그인이 필요합니다.')
      setLoading(false)
      router.push('/login')
      return
    }

    const { error: insertError } = await supabase.from('notes').insert({
      user_id: user.id,
      title,
      subject,
      content,
      is_public: isPublic,
    })

    setLoading(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    router.push('/notes')
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>필기 작성</h1>

      {error && (
        <p style={{ color: 'red', marginBottom: 16 }}>{error}</p>
      )}

      <input
        type="text"
        placeholder="과목명 (예: 자료구조)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 12, fontSize: 14 }}
      />

      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 12, fontSize: 16 }}
      />

      <div data-color-mode="light" style={{ marginBottom: 16 }}>
        <MDEditor value={content} onChange={(v) => setContent(v || '')} height={400} />
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        다른 사람에게 공개하기
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: '10px 24px',
          background: '#4f46e5',
          color: 'white',
          borderRadius: 8,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {loading ? '저장 중...' : '저장하기'}
      </button>
    </div>
  )
}