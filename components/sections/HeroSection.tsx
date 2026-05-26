export default function HeroSection() {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 md:px-12 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm font-medium text-apple-blue mb-6 tracking-wide uppercase">
          홈페이지 제작 에이전시
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-semibold text-apple-black leading-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          당신의 비즈니스를
          <br />
          웹으로 연결합니다.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-apple-gray max-w-2xl mx-auto leading-relaxed">
          소상공인·스타트업을 위한 랜딩페이지와 기업 홈페이지. 빠르고 깔끔하게.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="bg-apple-blue text-white rounded-full px-8 py-4 text-base font-medium hover:bg-apple-blue-hover transition-colors w-full sm:w-auto text-center"
          >
            무료 상담 신청
          </a>
          <a
            href="#portfolio"
            className="bg-apple-light text-apple-black rounded-full px-8 py-4 text-base font-medium hover:bg-gray-200 transition-colors w-full sm:w-auto text-center"
          >
            포트폴리오 보기
          </a>
        </div>
      </div>
    </section>
  )
}
