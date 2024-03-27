import Head from 'next/head'
import { StationList } from '../components/station-list'
import styles from '../styles/Home.module.css'

export default function Home({ stationList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>BART Times</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="Simple site to get Bay Area Rapid Transit (BART) train times" />
        <meta name="keywords" content="username generator, generate username, cute username" />
        <meta name="language" content="English" />
        <meta name="robots" content="index, follow" />
        <meta name="title" content="BART Times - bartti.me" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bartti.me/" />
        <meta property="og:title" content="BART Times - bartti.me" />
        <meta property="og:description" content="Simple site to get Bay Area Rapid Transit (BART) train times" />
      </Head>
      {stationList.length ? <StationList stationList={stationList} /> : <div> Loading... </div>}
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
    const data = await response.json()
    return { props: { stationList: data?.root?.stations?.station } }
  } catch (e) {
    console.error('error in fetching in pages/index.js getServerSideProps()', e)
    return { props: { stationList: {} } }
  }
}
