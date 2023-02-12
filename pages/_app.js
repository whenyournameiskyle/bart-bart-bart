import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';
import Script from 'next/script';

const GA_TRACKING_ID = 'G-VQFFMCB9MX';
const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script async src={scriptUrl} />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
