import Image from 'next/image'
import { Header } from '../components/header'

export default async function Page() {
  return (
    <div className="container">
      <Header shouldShowBack={true}>Thank you for tipping!</Header>
      <div className="qrContainer">
        <a href="https://cash.app/$KyleAnne" target="_blank" className="ctaLinkLarge">
          <Image src="/explodedsoda-cashapp-transparent-QR.png" height={500} width={500} alt="QR code for CashApp" layout="responsive" />
          <div>$KyleAnne</div>
        </a>
        <a href="https://venmo.com/u/explodedsoda" target="_blank" className="ctaLinkLarge">
          <Image src="/explodedsoda-venmo-transparent-QR.png" height={500} width={500} alt="QR code for Venmo" layout="responsive" />
          <div>@explodedsoda</div>
        </a>
      </div>
    </div>
  )
}
