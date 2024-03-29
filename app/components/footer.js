import Link from 'next/link'

export const Footer = () => (
  <div className="footer">
    <div className="tinyText">
      made with love by{' '}
      <a className="ctaLink" href="https://linktr.ee/explodedsoda" _target="blank">
        @explodedsoda
      </a>
    </div>
    <div className="tinyText">
      please{' '}
      <Link className="ctaLink" href="/tip" _target="blank">
        leave a tip
      </Link>{' '}
      if you find this useful
    </div>
  </div>
)
