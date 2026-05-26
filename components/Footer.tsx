export default function Footer() {
  return (
    <footer className="bg-apple-light py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xl font-semibold text-apple-black tracking-tight">lapin</p>
            <p className="mt-1 text-sm text-apple-gray">홈페이지 제작 에이전시</p>
          </div>
          <div className="text-sm text-apple-gray space-y-1">
            <p>상호명: 라핀</p>
            <p>대표: 김라핀</p>
            <p>이메일: hello@lapin.kr</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-apple-gray">
            © {new Date().getFullYear()} lapin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
