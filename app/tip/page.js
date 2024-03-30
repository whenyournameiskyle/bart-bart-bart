import Image from 'next/image'
import { Header } from '../components/header'

export default async function Page() {
  return (
    <div className="container">
      <Header shouldShowBack={true}>Thank you for tipping!</Header>
      <div className="qrContainer">
        <a href="https://cash.app/$KyleAnne" target="_blank" className="ctaLinkLarge">
          <Image alt="QR code for CashApp" height={500} src="/explodedsoda-cashapp-transparent-QR.png" width={500} className="qrCode" />
          <div>$KyleAnne</div>
        </a>
        <a href="https://venmo.com/u/explodedsoda" target="_blank" className="ctaLinkLarge">
          <Image alt="QR code for CashApp" height={500} src="/explodedsoda-venmo-transparent-QR.png" width={500} className="qrCode" />
          <div>@explodedsoda</div>
        </a>
      </div>
    </div>
  )
}
