import Image from 'next/image'

const portfolios = [
  {
    category: '랜딩페이지',
    title: '그린피트 - 피트니스 스튜디오',
    desc: '등록 전환 중심 단일 페이지. 수강 신청 폼 연동.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop&auto=format',
    alt: '피트니스 스튜디오 인테리어',
  },
  {
    category: '기업 홈페이지',
    title: '블루마켓 - B2B 식자재 유통',
    desc: '회사 소개·서비스·거래처 문의 다페이지 구성.',
    img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80&fit=crop&auto=format',
    alt: '신선한 식재료',
  },
  {
    category: '랜딩페이지',
    title: '노마드랩 - IT 교육 부트캠프',
    desc: '수강 신청 리드 전환 최적화. A/B 테스트 구조 설계.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop&auto=format',
    alt: '팀원들이 함께 노트북으로 학습하는 모습',
  },
  {
    category: '기업 홈페이지',
    title: '하모니스파 - 스파·뷰티 브랜드',
    desc: '예약 폼·시술 소개·갤러리 포함 브랜드 사이트.',
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80&fit=crop&auto=format',
    alt: '스파 인테리어',
  },
]

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 md:py-32 lg:py-40 bg-apple-light">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-semibold text-apple-black"
            style={{ letterSpacing: '-0.03em' }}
          >
            포트폴리오
          </h2>
          <p className="mt-4 text-lg text-apple-gray">실제로 만든 프로젝트들입니다.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {portfolios.map(({ category, title, desc, img, alt }) => (
            <div
              key={title}
              className="bg-white rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={img}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-medium text-apple-blue bg-blue-50 rounded-full px-3 py-1 mb-3">
                  {category}
                </span>
                <h3 className="text-lg font-semibold text-apple-black">{title}</h3>
                <p className="mt-1 text-sm text-apple-gray">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
