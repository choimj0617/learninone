import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function MyPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: myNotes, error } = await supabase
    .from('notes')
    .select('id, title, subject, is_public, like_count, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 20px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 32,
          padding: '20px 24px',
          background: '#fafafa',
          borderRadius: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#4f46e5',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {(user.user_metadata?.full_name ?? user.email ?? '?')[0]}
        </div>
        <div>
          <p style={{ fontSize: 16, fontWeight: 600 }}>
            {user.user_metadata?.full_name ?? user.email}
          </p>
          <p style={{ fontSize: 13, color: '#888' }}>
            작성한 필기 {myNotes?.length ?? 0}개
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>내가 쓴 필기</h2>

      {error && <p style={{ color: '#dc2626', fontSize: 14 }}>불러오지 못했습니다: {error.message}</p>}

      {!error && myNotes?.length === 0 && (
        <div
          style={{
            border: '1px dashed #ddd',
            borderRadius: 16,
            padding: '48px 20px',
            textAlign: 'center',
            color: '#999',
          }}
        >
          <p style={{ marginBottom: 12 }}>아직 작성한 필기가 없어요.</p>
          <Link
            href="/notes/new"
            style={{
              color: '#4f46e5',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            첫 필기 작성하러 가기 →
          </Link>
        </div>
      )}

      <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0 }}>
        {myNotes?.map((note) => (
          <li key={note.id}>
            <Link
              href={`/notes/${note.id}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid #eee',
                borderRadius: 14,
                padding: '18px 20px',
              }}
              className="note-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#4f46e5',
                      background: '#eef2ff',
                      padding: '3px 10px',
                      borderRadius: 999,
                      marginBottom: 8,
                    }}
                  >
                    {note.subject || '기타'}
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 6px' }}>{note.title}</h3>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: note.is_public ? '#e0f2fe' : '#f3f4f6',
                    color: note.is_public ? '#0369a1' : '#6b7280',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {note.is_public ? '공개' : '비공개'}
                </span>
              </div>
              <p style={{ fontSize: 12.5, color: '#999' }}>
                🪙 {note.like_count} · {new Date(note.created_at).toLocaleDateString('ko-KR')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}