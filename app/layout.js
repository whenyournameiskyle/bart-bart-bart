import { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata = {
  title: 'BART Times',
  description: 'Simple site to get Bay Area Rapid Transit (BART) train times',
  keywords:
    'Bay Area Rapid Transit, BART, Bay Area Rapid Transit times, BART train times, San Francisco train times, Berkeley train times, Oakland train times, BART webapp, BART browser app, BART schedule, BART stations, BART route, BART updates, BART planner, BART travel planner, BART trip planner',
  language: 'English',
  metadataBase: process.env.VERCEL_URL ? new URL(`https://bartti.me`) : new URL(`http://localhost:${process.env.PORT || 3000}`),
}

const isProduction = process?.env?.NODE_ENV === 'production'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense>{children}</Suspense>
      </body>
      {isProduction && (
        <>
          <Analytics />
          <GoogleAnalytics gaId="G-T24FB5FHFQ" />
        </>
      )}
    </html>
  )
}
