import type { Metadata } from 'next';
import '@/styles/globals.scss';
import '@/fonts/stylesheet.css';
import { fontTTInterphasesProMono, fontTTInterphasesProVar } from '@/fonts';
// import { SetupMockServer } from '@/components/SetupMockServer';
import GeneralWrapper from '@/components/layout/GeneralWrapper';
import Header from '@/components/layout/Header';
import { ToastsContainer } from '@/components/layout/Toasts';
import classNames from 'classnames';
import FooterWrapper from '@/components/layout/Footer/FooterWrapper';
import SmoothScroll from '@/components/shared/SmoothScroll';
import Script from 'next/script';
import { ScrollUpBtn } from '@/components/layout/ScrollUpBtn';
import { CookieConsent } from '@/components/layout/CookieConsent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const seoDescription = 'VisionLabs develops leading facial recognition technology, ensuring the smooth operation of digital identities in the connected world.';

export const metadata: Metadata = {
  title: 'VisionLabs | Machines can see',
  description: seoDescription,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    other: [
      { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
      { rel: 'shortcut icon', type: 'image/x-icon', url: '/favicon.ico' }
    ],
  },
  openGraph: {
    title: 'VisionLabs | Machines can see',
    description: seoDescription,
    url: siteUrl,
    siteName: 'VisionLabs',
    images: [
      {
        url: `${siteUrl}/preview.jpg`,
        width: 1300,
        height: 480,
        alt: 'Website preview',
      }
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Wix+Madefor+Display:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={classNames(fontTTInterphasesProVar.variable, fontTTInterphasesProMono.variable)}>
        <Script
          id="metrika-counter"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(102944320, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />
        <noscript><div><img src="https://mc.yandex.ru/watch/102944320" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>
        {/* Моковый сервер временно отключен из-за проблем с mirage js при деплое без дев-зависимостей. */}
        {/* <SetupMockServer /> */}
        <SmoothScroll>
          <GeneralWrapper>
            <Header />
            <main>
              {children}
            </main>
            <ScrollUpBtn />
            <CookieConsent />
            <FooterWrapper />
            <ToastsContainer/>
          </GeneralWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
