import { Header } from '../components/header'

export default async function Page() {
  return (
    <div className="container">
      <Header shouldShowBack={true}>Thank you for tipping!</Header>
      <a href="https://cash.app/$KyleAnne" target="_blank" className="ctaLinkLarge">
        CashApp: $KyleAnne
      </a>
      <a href="https://venmo.com/u/explodedsoda" target="_blank" className="ctaLinkLarge">
        Venmo: @explodedsoda
      </a>
    </div>
  )
}
