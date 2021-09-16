import { useEffect } from 'react'
import fetch from 'node-fetch'
import Head from 'next/head'
import { StationList } from '../components/station-list'
import styles from '../styles/Home.module.css'

export default function Home ({ stationList }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    function gtag () {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'UA-146149246-1', {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: window.document.title
    })
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>BART Times</title>
        <script async src='https://www.googletagmanager.com/gtag/js?id=UA-146149246-1' />
      </Head>
      <StationList stationList={stationList} />
    </div>
  )
}

export async function getServerSideProps (context) {
  const response = await fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
  const data = await response.json()
  return { props: { stationList: data?.root?.stations?.station } }
}
