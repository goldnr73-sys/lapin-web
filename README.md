# 실습 06 - 라핀 홈페이지 (강의 18강 결과물)

1인 홈페이지 제작 에이전시 "라핀"의 브랜드 랜딩페이지예요. 방문자 문의 접수 기능과 라핀 본인용 어드민 페이지가 포함되어 있어요. Next.js 16 + Supabase.

> ⚠ **이 실습은 강의 영상 동반 필수예요.** Supabase 프로젝트 생성 + `contacts` 테이블 + 어드민 계정 생성 단계가 있어서, 폴더만 가지고는 바로 실행이 안 돼요. 강의 영상의 셋업 파트를 따라 하면서 진행해 주세요.

## 코드만 둘러보고 싶다면 (셋업 안 하고)

VSCode에서 이 폴더를 열고 Claude 패널에 아래 프롬프트를 던지면 코드 흐름을 빠르게 익힐 수 있어요.

```
이 프로젝트의 CLAUDE.md를 기반으로 전체 구조랑 핵심 파일 흐름을 설명해줘.
랜딩페이지 섹션 컴포넌트들이 어떻게 조립되는지도 알려줘.
```

다른 예시:
- `메인 색상을 보라색 계열로 바꾸고 싶어. 어떤 파일을 어떻게 수정해야 해?`
- `포트폴리오 섹션에 카드 하나 더 추가하려면?`

## 사전 준비

- Node.js 18 이상 (https://nodejs.org)
- **Supabase 계정** (https://supabase.com - 문의 데이터 저장용, 강의 11강 참고)

## 실행 방법

### STEP 1: 환경 변수 설정 (최초 1회)

`실행.command` 또는 `실행.bat`를 더블클릭하면 `.env.local`이 자동으로 만들어지고 에디터로 열려요. 다음 항목을 채워 주세요.

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
ADMIN_PASSWORD=your_admin_password_here
```

Supabase 키는 https://supabase.com 대시보드 > 프로젝트 > Settings > API 에서 확인할 수 있어요. service_role 키는 사용하지 않아요 (anon key + RLS로 충분).

### STEP 2: Supabase 테이블 생성 (강의 영상 참고)

`contacts` 테이블이 있어야 문의 접수가 동작해요. 강의에서 만든 SQL을 Supabase SQL Editor에 실행하세요.

### STEP 3: 실행

### 1순위: 더블클릭

**Windows**: `실행.bat` 더블클릭

**macOS**: `실행.command` 더블클릭

자동으로 http://localhost:3000 열려요. 어드민 페이지는 http://localhost:3000/admin

### 2순위: 터미널

```bash
npm install
npm run dev
```

## 주요 페이지

- `/` - 메인 랜딩 (서비스 소개, 포트폴리오, 가격, 문의 폼)
- `/admin` - 어드민 (문의 목록, 상태 관리) - `ADMIN_PASSWORD` 필요

## 빌드 / 배포

```bash
npm run build
npm run start         # 빌드 결과 로컬 실행
```

Vercel 배포는 GitHub 푸시 후 vercel.com에서 연동. 환경 변수 3개(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ADMIN_PASSWORD`)를 Vercel 대시보드에도 똑같이 입력해야 해요.

## 트러블슈팅

### 문의 폼 제출이 안 돼요

1. `.env.local`의 Supabase URL/Key가 맞는지 확인
2. Supabase 대시보드에서 `contacts` 테이블이 만들어졌는지 확인
3. 브라우저 콘솔(F12)에서 빨간 에러 메시지 확인

### "/admin" 접근 시 401 또는 무한 로딩

`ADMIN_PASSWORD` 환경 변수가 비어 있어요. `.env.local`에 비밀번호 설정 후 `npm run dev` 다시 시작.

### "포트 3000이 사용 중"

다른 Next.js 프로젝트가 켜져 있어요. 그쪽 터미널을 끄거나 `PORT=3001 npm run dev`로 다른 포트 사용.

## 보안 주의

- `.env.local`은 절대 GitHub에 올리지 마세요. `.gitignore`에 포함되어 있어요.
- `ADMIN_PASSWORD`는 충분히 길고 추측 불가능하게 설정 (최소 16자 + 영문 / 숫자 / 기호 혼합)
- 어드민 페이지를 외부에 배포할 때는 IP 제한 등 추가 보안 고려
