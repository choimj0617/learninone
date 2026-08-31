import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function NotesPage() {
  const supabase = await createClient()

  const { data: notes, error } = await supabase
    .from('notes')
    .select('id, title, subject, created_at, like_count, user_id')
    .order('created_at', { ascending: false })

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 40px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 32,
          borderBottom: '1px solid #eee',
          paddingBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>필기 목록</h1>
          <p style={{ fontSize: 14, color: '#888' }}>다른 학생들이 공유한 수업 필기예요</p>
        </div>
        <Link
          href="/notes/new"
          style={{
            padding: '10px 20px',
            background: '#4f46e5',
            color: 'white',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          + 새 필기
        </Link>
      </div>

      {error && (
        <p style={{ color: '#dc2626', fontSize: 14 }}>목록을 불러오지 못했습니다: {error.message}</p>
      )}

      {!error && notes?.length === 0 && (
        <div
          style={{
            border: '1px dashed #ddd',
            borderRadius: 16,
            padding: '48px 20px',
            textAlign: 'center',
            color: '#999',
          }}
        >
          아직 작성된 필기가 없어요. 첫 필기를 남겨보세요!
        </div>
      )}

      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
          listStyle: 'none',
          padding: 0,
        }}
      >
        {notes?.map((note) => (
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
                height: '100%',
              }}
              className="note-card"
            >
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
              <h2 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 6px' }}>{note.title}</h2>
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