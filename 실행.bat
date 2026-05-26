@echo off
chcp 65001 > nul
title 실습 06 - 라핀 홈페이지
cd /d "%~dp0"

echo ============================================================
echo  실습 06 - 라핀 홈페이지 실행 중
echo ============================================================
echo.

where node > nul 2>&1
if errorlevel 1 (
    echo  [오류] Node.js가 설치되어 있지 않아요.
    echo  https://nodejs.org 에서 LTS 버전을 설치해 주세요.
    echo.
    pause
    exit /b 1
)

if not exist ".env.local" (
    echo  [최초 1회 설정] .env.local 파일을 자동으로 만들어 드릴게요.
    copy /Y .env.local.example .env.local > nul
    echo.
    echo  잠시 후 .env.local 파일이 메모장으로 열려요.
    echo  다음 항목을 본인 값으로 채워 주세요:
    echo    - NEXT_PUBLIC_SUPABASE_URL
    echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    echo    (Supabase 키 위치: 프로젝트 ^> Settings ^> API)
    echo    - ADMIN_PASSWORD  (어드민 페이지 접속용 비밀번호, 16자 이상 권장)
    echo.
    echo  채우고 저장(Ctrl+S)한 뒤 메모장을 닫으면 자동으로 이어집니다.
    echo.
    start /WAIT notepad .env.local
)

if not exist "node_modules" (
    echo  [1/2] 처음 실행이라 의존성을 설치해요. 1~2분 걸려요...
    call npm install
    if errorlevel 1 (
        echo.
        echo  [오류] npm install 실패. 인터넷 연결을 확인해 주세요.
        pause
        exit /b 1
    )
    echo  [1/2] 의존성 설치 완료.
    echo.
)

echo  [2/2] 개발 서버 실행 중...
echo  브라우저가 자동으로 열리지 않으면 http://localhost:3000 접속하세요.
echo  어드민: http://localhost:3000/admin
echo.
call npm run dev

pause
