import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MarkdownPreview from '@uiw/react-markdown-preview'

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: note, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !note) {
    notFound()
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <span style={{ fontSize: 12, color: '#4f46e5', fontWeight: 600 }}>
        {note.subject || '기타'}
      </span>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>{note.title}</h1>
      <p style={{ fontSize: 13, color: '#999', marginBottom: 24 }}>
        좋아요 {note.like_count} · {new Date(note.created_at).toLocaleDateString()}
      </p>

      <div data-color-mode="light">
        <MarkdownPreview source={note.content} />
      </div>
    </div>
  )
}