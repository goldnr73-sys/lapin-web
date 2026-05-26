import ContactForm from '@/components/ContactForm'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40 bg-apple-light">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2
              className="text-4xl md:text-5xl font-semibold text-apple-black"
              style={{ letterSpacing: '-0.03em' }}
            >
              문의하기
            </h2>
            <p className="mt-4 text-lg text-apple-gray leading-relaxed">
              제작하고 싶은 사이트가 있으신가요?
              <br />
              간단히 남겨주시면 24시간 내에 연락드립니다.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-apple-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-apple-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-apple-gray">hello@lapin.kr</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-apple-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-apple-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-apple-gray">평일 10:00 - 18:00 (주말 제외)</span>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
