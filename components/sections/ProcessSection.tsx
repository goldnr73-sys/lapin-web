const steps = [
  {
    num: '01',
    title: '상담',
    desc: '비즈니스 목표·타겟·레퍼런스를 파악합니다. 카카오톡 또는 이메일로 30분 무료 상담.',
  },
  {
    num: '02',
    title: '기획',
    desc: '와이어프레임과 섹션 구성안을 제안합니다. 피드백을 반영해 확정합니다.',
  },
  {
    num: '03',
    title: '개발',
    desc: 'Next.js 기반으로 빠르고 깔끔하게 구현합니다. 중간 확인 링크를 공유합니다.',
  },
  {
    num: '04',
    title: '런칭',
    desc: '도메인 연결·배포·최종 검수까지. 런칭 후 1개월 무상 수정을 지원합니다.',
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-semibold text-apple-black"
            style={{ letterSpacing: '-0.03em' }}
          >
            제작 프로세스
          </h2>
          <p className="mt-4 text-lg text-apple-gray">상담부터 런칭까지, 4단계로 진행됩니다.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="relative">
              <span className="text-5xl font-bold text-apple-light">{num}</span>
              <h3 className="mt-3 text-xl font-semibold text-apple-black">{title}</h3>
              <p className="mt-2 text-sm text-apple-gray leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
