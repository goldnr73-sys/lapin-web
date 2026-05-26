#!/bin/bash
cd "$(dirname "$0")"

echo "============================================================"
echo " 실습 06 - 라핀 홈페이지 실행 중"
echo "============================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo " [오류] Node.js가 설치되어 있지 않아요."
    echo " https://nodejs.org 에서 LTS 버전을 설치해 주세요."
    echo ""
    read -n 1 -s -r -p "아무 키나 누르면 창이 닫혀요..."
    exit 1
fi

if [ ! -f ".env.local" ]; then
    echo " [최초 1회 설정] .env.local 파일을 자동으로 만들어 드릴게요."
    cp .env.local.example .env.local
    echo ""
    echo " 잠시 후 .env.local 파일이 텍스트 편집기로 열려요."
    echo " 다음 항목을 본인 값으로 채워 주세요:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   (Supabase 키 위치: 프로젝트 > Settings > API)"
    echo "   - ADMIN_PASSWORD  (어드민 페이지 접속용 비밀번호, 16자 이상 권장)"
    echo ""
    echo " 채우고 저장(Cmd+S)한 뒤 이 터미널 창에서 Enter를 눌러 주세요."
    open -e .env.local
    read -p " ▶ 키 입력 완료했으면 Enter ↵ "
fi

if [ ! -d "node_modules" ]; then
    echo " [1/2] 처음 실행이라 의존성을 설치해요. 1~2분 걸려요..."
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo " [오류] npm install 실패. 인터넷 연결을 확인해 주세요."
        read -n 1 -s -r -p "아무 키나 누르면 창이 닫혀요..."
        exit 1
    fi
    echo " [1/2] 의존성 설치 완료."
    echo ""
fi

echo " [2/2] 개발 서버 실행 중..."
echo " 브라우저가 자동으로 열리지 않으면 http://localhost:3000 접속하세요."
echo " 어드민: http://localhost:3000/admin"
echo ""
npm run dev

read -n 1 -s -r -p "아무 키나 누르면 창이 닫혀요..."
