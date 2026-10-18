import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'Hùng Thái Portal - Light Multi-Color Glass UI',
  description: 'Executive Portfolio & Contact Hub - Nguyễn Hùng Thái - Trưởng phòng Chăm sóc Khách hàng',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.07a14.09 14.09 0 0 1 1.84 3.93h-3.68A14.09 14.09 0 0 1 12 4.07zM4.26 14A7.94 7.94 0 0 1 4 12c0-.69.09-1.36.26-2h3.38a16.78 16.78 0 0 0-.14 2c0 .68.05 1.35.14 2zm.81 2h2.95a15.65 15.65 0 0 0 1.38 3.56A8.03 8.03 0 0 1 5.07 16zm2.95-8H5.07a8.03 8.03 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.02 8zM12 19.93a14.09 14.09 0 0 1-1.84-3.93h3.68A14.09 14.09 0 0 1 12 19.93zm2.34-5.93h-4.68a15.17 15.17 0 0 1-.16-2c0-.68.05-1.35.16-2h4.68c.11.65.16 1.32.16 2s-.05 1.35-.16 2zm1.68 5.56A15.65 15.65 0 0 0 17.4 16h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14a16.78 16.78 0 0 0 .14-2c0-.68-.05-1.35-.14-2h3.38c.17.64.26 1.31.26 2s-.09 1.36-.26 2z'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" data-theme="light-glass" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme')||localStorage.getItem('hungthai_site_theme')||'light-glass';var val=t==='dark-neon'?'dark-neon':(t==='flat-rainbow'?'flat-rainbow':'light-glass');document.documentElement.setAttribute('data-theme',val);if(val==='dark-neon')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="text-slate-800 h-screen w-screen overflow-hidden p-0 m-0 relative bg-slate-50 dark:bg-[#080b18]">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
