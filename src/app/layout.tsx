import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { AppProviders } from '@/components/providers/AppProviders';

export const metadata: Metadata = {
  title: 'Hùng Thái Portal – Executive Portfolio & CX Leadership',
  description: 'Executive Portfolio & Contact Hub – Nguyễn Hùng Thái – Trưởng phòng Chăm sóc Khách hàng (Head of Customer Service & CX Operations). 20+ năm kinh nghiệm quản trị vận hành Contact Center & FinTech.',
  keywords: [
    'Nguyễn Hùng Thái',
    'Customer Experience Director',
    'Head of Customer Service',
    'CX Leadership',
    'Contact Center Management',
    'FinTech Operations',
    'CV Hùng Thái',
    'Portfolio CX',
  ],
  authors: [{ name: 'Nguyễn Hùng Thái' }],
  creator: 'Nguyễn Hùng Thái',
  metadataBase: new URL(process.env.APP_URL || 'https://ais-pre-6ynvjesun7p3bbi7qisis7-498435453400.asia-southeast1.run.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hùng Thái Portal – Executive Portfolio & CX Leadership',
    description: 'Executive Portfolio & Contact Hub – Nguyễn Hùng Thái – Trưởng phòng Chăm sóc Khách hàng (Head of Customer Service & CX Operations). 20+ năm kinh nghiệm quản trị vận hành Contact Center & FinTech.',
    url: '/',
    siteName: 'Hùng Thái Portal',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hùng Thái Portal – Executive Portfolio & CX Leadership',
    description: 'Executive Portfolio & Contact Hub – Nguyễn Hùng Thái – Trưởng phòng Chăm sóc Khách hàng (Head of Customer Service & CX Operations).',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb'%3E%3Cpath d='M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.93 8zM12 4.07a14.09 14.09 0 0 1 1.84 3.93h-3.68A14.09 14.09 0 0 1 12 4.07zM4.26 14A7.94 7.94 0 0 1 4 12c0-.69.09-1.36.26-2h3.38a16.78 16.78 0 0 0-.14 2c0 .68.05 1.35.14 2zm.81 2h2.95a15.65 15.65 0 0 0 1.38 3.56A8.03 8.03 0 0 1 5.07 16zm2.95-8H5.07a8.03 8.03 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.02 8zM12 19.93a14.09 14.09 0 0 1-1.84-3.93h3.68A14.09 14.09 0 0 1 12 19.93zm2.34-5.93h-4.68a15.17 15.17 0 0 1-.16-2c0-.68.05-1.35.16-2h4.68c.11.65.16 1.32.16 2s-.05 1.35-.16 2zm1.68 5.56A15.65 15.65 0 0 0 17.4 16h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14a16.78 16.78 0 0 0 .14-2c0-.68-.05-1.35-.14-2h3.38c.17.64.26 1.31.26 2s-.09 1.36-.26 2z'/%3E%3C/svg%3E",
        type: 'image/svg+xml',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const jsonLdStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://hungthai.portal/#website',
      url: 'https://hungthai.portal',
      name: 'Hùng Thái Portal',
      description: 'Executive Portfolio & Contact Hub – Nguyễn Hùng Thái – Trưởng phòng Chăm sóc Khách hàng',
      inLanguage: 'vi-VN',
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://hungthai.portal/#webpage',
      url: 'https://hungthai.portal',
      name: 'Nguyễn Hùng Thái – Executive Portfolio & CX Leadership',
      isPartOf: { '@id': 'https://hungthai.portal/#website' },
      mainEntity: {
        '@type': 'Person',
        name: 'Nguyễn Hùng Thái',
        jobTitle: 'Head of Customer Service & CX Operations',
        worksFor: {
          '@type': 'Organization',
          name: 'Finviet / ShopeePay / MoMo / VED',
        },
        description: '20+ năm kinh nghiệm quản trị và tối ưu trải nghiệm khách hàng đa kênh (Omnichannel Contact Center), công nghệ CSKH AI và chuyển đổi số vận hành.',
        email: 'trinhan.virtual@gmail.com',
      },
    },
  ],
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStructuredData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var _f=window.fetch;var _cf=_f;Object.defineProperty(window,'fetch',{configurable:true,enumerable:true,get:function(){return _cf;},set:function(v){_cf=v;}});var _t=localStorage.getItem('hungthai_site_theme');var _at=(_t==='dark-neon'||_t==='light-glass')?_t:'light-glass';document.documentElement.setAttribute('data-theme',_at);if(_at==='dark-neon'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="text-slate-800 dark:text-slate-100 min-h-screen w-full max-w-full overflow-x-hidden p-0 m-0 relative bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
      >
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
