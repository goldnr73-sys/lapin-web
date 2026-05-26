@AGENTS.md

# lapin-web - 프로젝트 현황

> 라핀 에이전시 브랜드 랜딩페이지 + 고객 문의 어드민 시스템

---

## 스택

- **프레임워크**: Next.js 16 (App Router, Turbopack)
- **스타일**: Tailwind CSS v4 (`@theme` 블록으로 디자인 토큰 정의, `tailwind.config.ts` 없음)
- **백엔드**: Supabase (PostgreSQL + Auth + RLS)
- **배포**: Vercel (예정)
- **언어**: TypeScript

---

## 프로젝트 구조

```
homepage/
├── app/
│   ├── globals.css                  # Tailwind v4 + 애플 디자인 토큰
│   ├── layout.tsx                   # 루트 레이아웃 (Inter 폰트, OG 메타데이터)
│   ├── page.tsx                     # 랜딩페이지 (7개 섹션 조립)
│   ├── api/contact/route.ts         # POST /api/contact - 문의 접수
│   └── admin/
│       ├── layout.tsx               # 어드민 헤더 + 인증 가드
│       ├── page.tsx                 # 문의 목록 조회 (Server Component)
│       ├── login/page.tsx           # 로그인 페이지
│       └── _actions/contacts.ts    # Server Action - 상태 변경
├── components/
│   ├── Navbar.tsx                   # 스크롤 감지 + 모바일 햄버거 ('use client')
│   ├── Footer.tsx
│   ├── ContactForm.tsx              # 문의 폼 ('use client')
│   ├── AdminLoginForm.tsx           # Supabase Auth 로그인 ('use client')
│   ├── AdminContactTable.tsx        # 문의 테이블 + 상태 변경 ('use client')
│   └── sections/
│       ├── HeroSection.tsx          # 풀스크린 히어로
│       ├── ServicesSection.tsx      # 서비스 카드 2개
│       ├── ProcessSection.tsx       # 4단계 프로세스
│       ├── PortfolioSection.tsx     # 포트폴리오 카드 4개 (Unsplash 이미지)
│       ├── PricingSection.tsx       # Basic / Standard / Premium 요금제
│       ├── FAQSection.tsx           # 아코디언 FAQ ('use client')
│       └── ContactSection.tsx      # 문의 섹션 (ContactForm 포함)
├── lib/
│   ├── supabase/client.ts           # createBrowserClient
│   ├── supabase/server.ts           # createServerClient (쿠키 기반)
│   └── validations.ts              # 문의 폼 유효성 검사
├── types/index.ts                   # Contact, ContactStatus, ContactFormData
├── proxy.ts                         # /admin/* 인증 가드 (Next.js 16 컨벤션)
└── .env.local                       # 환경변수 (gitignore 처리됨)
```

---

## 디자인 시스템 (Tailwind v4)

`app/globals.css`의 `@theme` 블록에 정의. 별도 `tailwind.config.ts` 없음.

| 토큰 | 값 | 용도 |
|------|----|------|
| `apple-black` | `#1d1d1f` | 주 텍스트 |
| `apple-gray` | `#6e6e73` | 보조 텍스트 |
| `apple-light` | `#f5f5f7` | 교차 섹션 배경, 입력 배경 |
| `apple-blue` | `#0071e3` | CTA 버튼, 링크 |

**공통 클래스 패턴**
- 섹션 래퍼: `py-24 md:py-32 lg:py-40`
- 컨테이너: `max-w-6xl mx-auto px-6 md:px-12`
- 헤드라인: `text-4xl md:text-5xl font-semibold text-apple-black`, `style={{ letterSpacing: '-0.03em' }}`
- 카드: `rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]`
- CTA 버튼: `bg-apple-blue text-white rounded-full px-6 py-3 text-sm font-medium`

---

## 환경변수

`.env.local`에 아래 2개 필요. **절대 커밋 금지** (`.gitignore`에 `.env*` 포함됨).

```
NEXT_PUBLIC_SUPABASE_URL=https://gpsmpsicyhebxhhurtzx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

service role key 불필요 - anon key + RLS "Anyone can insert" 정책으로 문의 폼 INSERT 처리.

환경변수 미설정 시 동작:
- 어드민 페이지: 인증 우회, "Supabase 연동 필요" 안내 화면 표시
- 문의 폼: 제출 시 500 에러 (API Route에서 처리)
- 로그인 폼: 제출 시 에러 메시지 표시

---

## Supabase 연동 현황

- **프로젝트 ID**: `gpsmpsicyhebxhhurtzx`
- **CLI 버전**: `supabase@2.93.1` (devDependency)
- **마이그레이션**: `supabase/migrations/20260423000000_create_contacts.sql` - 원격 DB에 push 완료
- **어드민 계정**: Supabase Authentication > Users 에서 수동 생성 완료

새 환경에서 DB 재설정 시:
```bash
npx supabase login --token <access_token>
npx supabase link --project-ref gpsmpsicyhebxhhurtzx
npx supabase db push
```

---

## 주요 기술 결정

| 결정 | 내용 |
|------|------|
| Next.js 16 proxy.ts | `middleware.ts` → `proxy.ts` + `proxy` 함수명으로 변경 (Next.js 16 컨벤션) |
| Tailwind v4 | `tailwind.config.ts` 없이 `globals.css`의 `@theme` 블록으로 토큰 관리 |
| 어드민 상태 변경 | Server Action (`updateContactStatus`) + `revalidatePath` - API Route 불필요 |
| 포트폴리오 이미지 | Unsplash 무료 스톡 이미지 (`next/image` + `remotePatterns` 설정) |
| 환경변수 미설정 가드 | proxy.ts, admin/layout, admin/page, AdminLoginForm 4곳에서 graceful 처리 |
| service role key 제거 | anon key + RLS로 충분. `SUPABASE_SERVICE_ROLE_KEY` 의존성 완전 제거 |

---

## 로컬 개발

```bash
npm run dev     # http://localhost:3000 (포트 충돌 시 자동 변경)
npm run build   # 프로덕션 빌드 확인
```

## 배포 (Vercel)

1. GitHub 레포 연결
2. 환경변수 2개 등록 (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
3. 자동 배포 (main/master push 시)

---

## 디자인 리디자인 탐색 (2026-05-26)

### 목표
현재 Apple-minimalist 스타일에서 새 디자인 방향 탐색.
실제 코드 변경 없이 `preview-y2k.html` 단독 파일로 프리뷰 진행.

### 최종 채택 방향: Tour Me 무드
**레퍼런스**: Tour Me (러시아 투어 에이전시) + iaculus 구도

| 요소 | 결정 |
|------|------|
| 폰트 | `Barlow Condensed` 900 (헤드라인) + `Inter` 300/400 (본문) |
| 액센트 컬러 | `#c8d800` (옐로우-그린) |
| 헤드라인 스타일 | 대문자 + 이탤릭 혼합 (`WE BUILD *EVERY* WEBSITE`) |
| 히어로 | 풀블리드 배경사진 + 다크 오버레이 + 중앙 텍스트 |
| 섹션 구조 | Hero → About (포토그리드) → Why Us (01/02/03 번호 리스트) → Services → CTA |
| 언어 | 전체 영어 |

### 히어로 배경 이미지 적용 방법
1. 풍경 사진을 `public/bg-hero.jpg` 로 저장
2. `preview-y2k.html` 새로고침 시 자동 반영

### 탐색한 다른 방향들 (미채택)
- Y2K 픽셀/게임콘솔 스타일 (라벤더+핑크 팔레트, Press Start 2P 폰트)
- Anything.llm 꽃밭 배경 + 프로스티드 글라스 (Playfair Display 이탤릭)
- Tavus 스타일 에디토리얼 (크림 배경 + 레트로 컴퓨터 + Instrument Serif)

### 히어로 섹션 최종 업데이트 (HOOK Golf Club 스타일)
- Nav: 투명 오버레이, 스크롤 시 `scrolled` 클래스로 반투명 다크 배경 전환
- Hero: `position:absolute` 텍스트 왼쪽 하단 배치 (bottom 12%, left 6%)
- 헤드라인: `9vw Barlow Condensed 900` 대문자, 서브타이틀 추가
- 오버레이: 하단만 `rgba(0,0,0,.52)` — 사진이 충분히 보이도록 최소화
- CTA 버튼: `border-radius: 999px` 필 버튼
- JS: `bg-hero.jpg` 로드 감지 → 실패 시 6초 안내 배너 표시

### 파일
- `preview-y2k.html` — 독립 HTML 프리뷰 (실제 Next.js 코드와 무관)
- `public/bg-hero.png` — 히어로 배경사진 (PNG 포맷, 1672×941)
  - 경로: `./public/bg-hero.png` (file:// 직접 열기 기준 상대경로)
  - Next.js 서버 통해 볼 때는 `/bg-hero.png` 로 변경 필요
