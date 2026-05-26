'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: '제작 기간은 얼마나 걸리나요?',
    a: '랜딩페이지 기준 5~10일, 기업 홈페이지는 2~3주가 일반적입니다. 범위에 따라 달라지니 상담 시 확인해 드립니다.',
  },
  {
    q: '디자인 시안을 먼저 볼 수 있나요?',
    a: '계약 후 와이어프레임과 전체 레이아웃 시안을 먼저 공유합니다. 피드백을 반영한 뒤 개발에 착수합니다.',
  },
  {
    q: '도메인이 없어도 의뢰할 수 있나요?',
    a: '네. 도메인 구매와 연결을 함께 도와드립니다. 호스팅은 Vercel 무료 플랜을 기본으로 사용합니다.',
  },
  {
    q: '런칭 후 수정이 필요하면 어떻게 하나요?',
    a: '플랜별로 무상 수정 기간이 포함되어 있습니다. 이후 수정은 건당 또는 월정액 유지보수 계약으로 진행합니다.',
  },
  {
    q: '저작권은 누구에게 있나요?',
    a: '최종 납품 후 저작권은 의뢰인께 귀속됩니다. 소스코드 전체를 GitHub 저장소로 전달해 드립니다.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 md:py-32 lg:py-40 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-semibold text-apple-black"
            style={{ letterSpacing: '-0.03em' }}
          >
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-[14px] border border-gray-100 bg-apple-light overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-base font-medium text-apple-black pr-4">{q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-apple-gray transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-apple-gray leading-relaxed">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
