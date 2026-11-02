import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-white text-center">
      <h2 className="text-3xl font-black text-cyan-400 font-play mb-2">404 - Trang Không Tồn Tại</h2>
      <p className="text-slate-300 text-sm mb-6 max-w-md">
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md"
      >
        Trở về Trang chủ
      </Link>
    </div>
  );
}
