const plans = [
  {
    name: 'Basic',
    summary: '빠른 랜딩페이지',
    highlight: false,
    features: [
      '단일 페이지 (최대 5섹션)',
      '반응형 디자인',
      '문의 폼 연동',
      '기본 SEO 설정',
      '런칭 후 2주 무상 수정',
    ],
  },
  {
    name: 'Standard',
    summary: '완성도 높은 랜딩페이지',
    highlight: true,
    features: [
      '단일 페이지 (최대 8섹션)',
      '반응형 + 애니메이션',
      '문의 폼 + 관리자 대시보드',
      'SEO + 성능 최적화',
      '런칭 후 1개월 무상 수정',
      '도메인 연결 지원',
    ],
  },
  {
    name: 'Premium',
    summary: '기업 홈페이지',
    highlight: false,
    features: [
      '다페이지 구성 (최대 6페이지)',
      '커스텀 디자인 시스템',
      '어드민 CMS 포함',
      '완전 커스텀 기능 개발',
      '런칭 후 3개월 무상 수정',
      '유지보수 계약 별도 협의',
    ],
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-semibold text-apple-black"
            style={{ letterSpacing: '-0.03em' }}
          >
            요금제
          </h2>
          <p className="mt-4 text-lg text-apple-gray">
            정확한 금액은 상담 후 안내드립니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(({ name, summary, highlight, features }) => (
            <div
              key={name}
              className={`rounded-[18px] p-8 flex flex-col ${
                highlight
                  ? 'bg-apple-black text-white shadow-[0_8px_32px_rgba(0,0,0,0.16)]'
                  : 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
              }`}
            >
              <div className="mb-6">
                <h3 className={`text-2xl font-semibold ${highlight ? 'text-white' : 'text-apple-black'}`}>
                  {name}
                </h3>
                <p className={`mt-1 text-sm ${highlight ? 'text-gray-400' : 'text-apple-gray'}`}>
                  {summary}
                </p>
                <p className={`mt-4 text-sm font-medium ${highlight ? 'text-apple-blue' : 'text-apple-blue'}`}>
                  문의 시 안내
                </p>
              </div>

              <ul className="space-y-3 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlight ? 'text-apple-blue' : 'text-apple-blue'}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={highlight ? 'text-gray-300' : 'text-apple-gray'}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 w-full text-center rounded-full py-3 text-sm font-medium transition-colors ${
                  highlight
                    ? 'bg-apple-blue text-white hover:bg-apple-blue-hover'
                    : 'bg-apple-light text-apple-black hover:bg-gray-200'
                }`}
              >
                상담 신청
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
