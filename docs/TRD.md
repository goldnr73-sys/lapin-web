# TRD: 라핀 에이전시 랜딩페이지 (lapin-web)

> PRD 참조: `/docs/PRD.md`
> 기술 스택: Next.js 14 (App Router) · Tailwind CSS v3 · Supabase · Vercel

---

## 1. 개요

라핀 에이전시의 브랜드 랜딩페이지와 고객 문의 어드민 시스템을 구축한다.
Server Component 기본, Client Component 최소화 원칙으로 빠른 초기 로딩과 단순한 코드를 동시에 달성한다.

---

## 2. 아키텍처

### 3-Tier Layered Architecture

```
┌─────────────────────────────────────────────────────┐
│  PRESENTATION LAYER                                 │
│  app/ · components/                                 │
│  - Server Components (기본)                          │
│  - Client Components: Navbar, FAQSection,           │
│    ContactForm, AdminLoginForm, AdminContactTable   │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│  LOGIC LAYER                                        │
│  lib/ · app/api/ · app/admin/_actions/              │
│  - /api/contact/route.ts  (문의 제출 API)            │
│  - /admin/_actions/       (Server Actions)          │
│  - lib/validations.ts     (입력 유효성 검사)          │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│  DATA LAYER                                         │
│  lib/supabase/                                      │
│  - client.ts  (브라우저용 Supabase 클라이언트)        │
│  - server.ts  (서버/쿠키 기반 Supabase 클라이언트)    │
└─────────────────────────────────────────────────────┘
```

### 요청 흐름

```
방문자 문의 제출:
  브라우저 → ContactForm → fetch POST /api/contact
  → route.ts (유효성 검사 + Supabase INSERT) → 성공/에러 응답

어드민 접근:
  브라우저 → middleware.ts (세션 확인)
  → 비인증: redirect /admin/login
  → 인증됨: /admin 페이지 (Server Component, Supabase 직접 쿼리)

어드민 상태 변경:
  버튼 클릭 → Server Action (updateContactStatus)
  → Supabase UPDATE → revalidatePath → 목록 자동 갱신
```

---

## 3. 핵심 기술 결정

| 결정 | 선택 | 근거 |
|------|------|------|
| 어드민 인증 처리 | `middleware.ts` | `/admin/*` 전체를 파일 1개로 통제. 누락 경로 없음 |
| 어드민 상태 변경 | Server Action | API Route 불필요. 코드 30% 감소. 1인 운영자라 실시간성 불필요 |
| 포트폴리오 이미지 | `/public/images/` | 하드코딩 결정과 일관성. 재배포로 관리 |
| 폼 상태 관리 | `useState` (라이브러리 없음) | 필드 4개짜리 폼에 react-hook-form 불필요 |
| 컴포넌트 기본값 | Server Component | 번들 최소화. `'use client'`는 인터랙션 필요한 곳만 |

---

## 4. 프로젝트 구조

```
homepage/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃 (Inter 폰트, Metadata)
│   ├── page.tsx                    # 랜딩페이지 (Server Component)
│   ├── globals.css
│   │
│   ├── admin/
│   │   ├── layout.tsx              # 어드민 공통 레이아웃 (헤더)
│   │   ├── page.tsx                # 문의 목록 (Server Component)
│   │   ├── login/
│   │   │   └── page.tsx            # 로그인 페이지 (Client Component)
│   │   └── _actions/
│   │       └── contacts.ts         # Server Actions (updateContactStatus)
│   │
│   └── api/
│       └── contact/
│           └── route.ts            # POST 문의 접수
│
├── components/
│   ├── Navbar.tsx                  # 'use client' (스크롤 감지)
│   ├── Footer.tsx                  # Server
│   ├── ContactForm.tsx             # 'use client' (폼 상태)
│   ├── AdminLoginForm.tsx          # 'use client' (Supabase Auth)
│   ├── AdminContactTable.tsx       # 'use client' (상태 변경 버튼)
│   └── sections/
│       ├── HeroSection.tsx         # Server
│       ├── ServicesSection.tsx     # Server
│       ├── ProcessSection.tsx      # Server
│       ├── PortfolioSection.tsx    # Server
│       ├── PricingSection.tsx      # Server
│       ├── FAQSection.tsx          # 'use client' (아코디언)
│       └── ContactSection.tsx      # Server (ContactForm 포함)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # createBrowserClient
│   │   └── server.ts               # createServerClient (쿠키)
│   └── validations.ts              # 문의 폼 유효성 검사 함수
│
├── middleware.ts                   # /admin/* 인증 가드
├── types/
│   └── index.ts                    # Contact 인터페이스 등
├── public/
│   └── images/portfolio/           # 포트폴리오 이미지 (정적)
├── tailwind.config.ts
└── .env.local
```

---

## 5. 데이터 모델

### TypeScript 타입

```typescript
// types/index.ts

export type ContactStatus = 'new' | 'read' | 'replied'

export interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  status: ContactStatus
  created_at: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}
```

### Supabase SQL

```sql
-- contacts 테이블 생성
create table public.contacts (
  id         uuid default gen_random_uuid() primary key,
  name       text not null,
  email      text not null,
  phone      text,
  message    text not null,
  status     text not null default 'new',
  created_at timestamptz default now() not null
);

alter table public.contacts enable row level security;

create policy "Anyone can insert"
  on public.contacts for insert with check (true);

create policy "Auth users can select"
  on public.contacts for select using (auth.role() = 'authenticated');

create policy "Auth users can update"
  on public.contacts for update using (auth.role() = 'authenticated');

-- 성능 인덱스
create index contacts_created_at_idx on public.contacts(created_at desc);
create index contacts_status_idx on public.contacts(status);
```

### 환경변수

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # 서버에서만 사용 (API Route)
```

---

## 6. 핵심 구현 명세

### middleware.ts - 어드민 인증 가드

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // /admin/login은 통과, 나머지 /admin/* 은 세션 확인
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 세션 확인 후 없으면 /admin/login 리다이렉트
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

### /api/contact/route.ts - 문의 접수 API

```typescript
// POST /api/contact
// 1. 요청 바디 파싱
// 2. lib/validations.ts로 유효성 검사 (이름, 이메일, 메시지 필수)
// 3. SUPABASE_SERVICE_ROLE_KEY 로 서버 클라이언트 생성
// 4. contacts 테이블 INSERT
// 5. 성공 200 / 실패 400·500 응답
```

### /admin/_actions/contacts.ts - Server Action

```typescript
'use server'
import { revalidatePath } from 'next/cache'

export async function updateContactStatus(
  id: string,
  status: ContactStatus
): Promise<void> {
  // Supabase server client로 UPDATE
  // revalidatePath('/admin') → 목록 자동 갱신
}
```

### lib/validations.ts - 유효성 검사

```typescript
export function validateContactForm(data: ContactFormData): string | null {
  if (!data.name.trim()) return '이름을 입력해 주세요'
  if (!data.email.trim()) return '이메일을 입력해 주세요'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return '이메일 형식을 확인해 주세요'
  if (!data.message.trim()) return '문의 내용을 입력해 주세요'
  return null  // null = 유효
}
```

---

## 7. 디자인 시스템

### Tailwind 커스텀 토큰 (tailwind.config.ts)

```typescript
colors: {
  'apple-black': '#1d1d1f',   // 주 텍스트
  'apple-gray':  '#6e6e73',   // 보조 텍스트
  'apple-light': '#f5f5f7',   // 교차 섹션 배경
  'apple-blue':  '#0071e3',   // CTA 버튼
},
fontFamily: {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
},
```

### 공통 클래스 패턴

```
섹션 래퍼:   py-24 md:py-32 lg:py-40
컨테이너:    max-w-6xl mx-auto px-6 md:px-12
헤드라인:    text-4xl md:text-6xl font-semibold tracking-tight text-apple-black
서브카피:    text-lg md:text-xl text-apple-gray
CTA 버튼:    bg-apple-blue text-white rounded-full px-6 py-3 text-sm font-medium
카드:        bg-white rounded-[18px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-8
상태 배지:   rounded-full text-xs font-medium px-3 py-1
  new:      bg-blue-50 text-blue-600
  read:     bg-gray-100 text-gray-600
  replied:  bg-green-50 text-green-600
```

---

## 8. 구현 순서

### Phase 1: 기반 (Day 1)
1. `npx create-next-app@latest . --typescript --tailwind --app`
2. `npm install @supabase/supabase-js @supabase/ssr lucide-react`
3. `tailwind.config.ts` 애플 토큰 적용 + `globals.css`
4. `lib/supabase/client.ts` + `server.ts`
5. `types/index.ts`
6. Supabase 대시보드에서 contacts 테이블 + RLS SQL 실행
7. `.env.local` 환경변수 등록

### Phase 2: 랜딩페이지 (Day 2)
8. `Navbar.tsx` + `Footer.tsx`
9. `HeroSection` → `ServicesSection` → `ProcessSection`
10. `PortfolioSection` (이미지 플레이스홀더로 시작)
11. `PricingSection` → `FAQSection` → `ContactSection`
12. `app/page.tsx`에 섹션 조립

### Phase 3: 문의 폼 (Day 3 전반)
13. `lib/validations.ts`
14. `ContactForm.tsx` (useState, fetch POST)
15. `app/api/contact/route.ts`
16. 로컬에서 문의 제출 → Supabase 저장 확인

### Phase 4: 어드민 (Day 3 후반)
17. `middleware.ts` 인증 가드
18. `AdminLoginForm.tsx` + `app/admin/login/page.tsx`
19. `app/admin/_actions/contacts.ts` (Server Action)
20. `AdminContactTable.tsx` (상태 변경 버튼 포함)
21. `app/admin/page.tsx` + `app/admin/layout.tsx`

### Phase 5: 배포 (Day 4)
22. `app/layout.tsx` Metadata (title, description, OG)
23. `next/image`로 이미지 최적화
24. `npm run build` 통과 확인
25. Vercel 프로젝트 생성 + 환경변수 등록 + 배포
26. Supabase 대시보드에서 어드민 계정 생성

---

## 9. 리스크 및 완화

| 리스크 | 가능성 | 완화 방안 |
|--------|--------|-----------|
| Supabase RLS 설정 오류로 미인증 조회 가능 | 중간 | 배포 전 미로그인 상태에서 `/admin` 직접 접근 테스트 필수 |
| `SUPABASE_SERVICE_ROLE_KEY` 클라이언트 노출 | 낮음 | `.env.local`의 `NEXT_PUBLIC_` 접두사 없이 관리. API Route에서만 사용 |
| 스팸 문의 대량 제출 | 낮음 | MVP 단계에서는 허용. 필요 시 rate limiting 추가 (P1) |
| Vercel 환경변수 누락으로 빌드 실패 | 중간 | 배포 전 체크리스트: 3개 환경변수 모두 등록 확인 |

---

## 10. 테스트 설계

자동화 테스트보다 **수동 검증 체크리스트** 로 커버한다 (1인 MVP 기준).

### 필수 검증 항목

```
랜딩페이지
  □ 모든 섹션이 데스크톱(1280px)에서 정상 렌더링
  □ 모바일(375px)에서 레이아웃 깨짐 없음
  □ Navbar 앵커 링크 클릭 시 해당 섹션으로 스크롤
  □ FAQ 아코디언 열기/닫기 동작

문의 폼
  □ 필수 필드 비운 채 제출 시 에러 메시지 표시
  □ 잘못된 이메일 형식 입력 시 에러 메시지 표시
  □ 정상 제출 시 성공 메시지 표시 + 폼 초기화
  □ Supabase contacts 테이블에 행 생성 확인

어드민
  □ 비로그인 상태에서 /admin 접근 시 /admin/login 리다이렉트
  □ 잘못된 비밀번호 입력 시 에러 메시지 표시
  □ 로그인 성공 후 /admin 문의 목록 표시
  □ 상태 변경 버튼 클릭 시 DB 업데이트 + 화면 즉시 반영

빌드/배포
  □ npm run build 에러 없이 통과
  □ Vercel 배포 후 문의 제출 → 어드민 확인 end-to-end 동작
```

### `lib/validations.ts` 단위 테스트 (선택)

유일하게 순수 함수라 테스트 작성 비용이 낮음. 필요 시 Jest로 커버.

```typescript
// validateContactForm 테스트 케이스
// - 이름 없음 → 에러 반환
// - 이메일 없음 → 에러 반환
// - 잘못된 이메일 형식 → 에러 반환
// - 메시지 없음 → 에러 반환
// - 모두 유효 → null 반환
```
