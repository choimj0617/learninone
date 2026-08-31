import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/LogoutButton'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto w-full">
        <span className="text-xl font-bold tracking-tight">Note & Vault</span>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-300">
              {user.email ?? user.user_metadata?.full_name ?? '사용자'}님 환영합니다
            </span>
            <LogoutButton />
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"
          >
            로그인
          </Link>
        )}
      </header>

      {/* 히어로 섹션 */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <span className="text-sm text-indigo-400 font-medium mb-4 tracking-wide">
          컴공생을 위한 스터디 플랫폼
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          내 필기가 <span className="text-indigo-400">코인</span>이 되고,
          <br />
          코인으로 <span className="text-indigo-400">족보</span>를 얻는다
        </h1>
        <p className="mt-6 text-slate-400 max-w-xl text-lg">
          수업 필기를 공유해서 좋아요를 받으면 코인이 쌓이고,
          그 코인으로 관리자가 검증한 과목별 족보를 열람하세요.
        </p>
        <div className="mt-10 flex gap-4">
          {!user && (
            <Link
              href="/login"
              className="px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-400 transition font-semibold"
            >
              시작하기
            </Link>
          )}
        </div>
      </section>

      {/* 기능 요약 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full px-6 pb-24">
        <FeatureCard title="📝 필기 공유" desc="Markdown으로 정리한 수업 노트를 공유하고 기록하세요." />
        <FeatureCard title="🪙 코인 리워드" desc="좋아요를 받을수록 코인이 자동으로 쌓입니다." />
        <FeatureCard title="📚 족보 열람" desc="쌓인 코인으로 검증된 시험 족보를 열람하세요." />
      </section>
    </main>
  )
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  )
}