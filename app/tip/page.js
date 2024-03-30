import Image from 'next/image'
import { Header } from '../components/header'

export default async function Page() {
  return (
    <div className="container">
      <Header shouldShowBack={true}>Thank you for tipping!</Header>
      <div className="qrContainer">
        <a href="https://cash.app/$KyleAnne" target="_blank" className="ctaLinkLarge">
          <Image src="/explodedsoda-cashapp-transparent-QR.png" height={300} width={300} alt="QR code for CashApp" loading="lazy" />
          <div>$KyleAnne</div>
        </a>
        <a href="https://venmo.com/u/explodedsoda" target="_blank" className="ctaLinkLarge">
          <Image src="/explodedsoda-venmo-transparent-QR.png" height={300} width={300} alt="QR code for Venmo" loading="lazy" />
          <div>@explodedsoda</div>
        </a>
      </div>
    </div>
  )
}
