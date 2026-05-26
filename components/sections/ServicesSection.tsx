import { Globe, LayoutTemplate } from 'lucide-react'

const services = [
  {
    Icon: LayoutTemplate,
    title: '랜딩페이지',
    desc: '제품·서비스를 소개하고 문의·전환을 유도하는 단일 페이지 사이트',
    points: ['빠른 제작 (5~10일)', '전환 최적화 레이아웃', '모바일 완전 대응'],
  },
  {
    Icon: Globe,
    title: '기업 홈페이지',
    desc: '회사 소개·서비스·포트폴리오·채용까지 담은 다페이지 공식 웹사이트',
    points: ['브랜드 아이덴티티 반영', '다페이지 구성', 'SEO·성능 최적화'],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 lg:py-40 bg-apple-light">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-semibold text-apple-black"
            style={{ letterSpacing: '-0.03em' }}
          >
            서비스
          </h2>
          <p className="mt-4 text-lg text-apple-gray">두 가지 옵션, 당신의 상황에 맞게.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map(({ Icon, title, desc, points }) => (
            <div
              key={title}
              className="bg-white rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-8"
            >
              <div className="w-12 h-12 bg-apple-light rounded-xl flex items-center justify-center mb-6">
                <Icon size={24} className="text-apple-blue" />
              </div>
              <h3 className="text-2xl font-semibold text-apple-black mb-3">{title}</h3>
              <p className="text-apple-gray leading-relaxed mb-6">{desc}</p>
              <ul className="space-y-2">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-apple-gray">
                    <span className="w-1.5 h-1.5 rounded-full bg-apple-blue flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
