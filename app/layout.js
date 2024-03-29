import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { Suspense } from 'react'

export const metadata = {
  title: 'BART Times',
  description: 'Simple site to get Bay Area Rapid Transit (BART) train times',
  keywords: 'Bay Area Rapid Transit, BART, Bay Area Rapid Transit times, BART train times, train times',
  language: 'English',
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
