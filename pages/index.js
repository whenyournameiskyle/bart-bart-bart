import React, { useEffect } from 'react'
import Head from 'next/head'
import { array } from 'prop-types'
import fetch from 'isomorphic-unfetch'
import StationList from '../components/station-list'

const Index = ({ stationList }) => {
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
    <div>
      <Head>
        <title>BART Times</title>
        <script async src='https://www.googletagmanager.com/gtag/js?id=UA-146149246-1'></script>
      </Head>
      <StationList stationList={stationList} />
    </div>
  )
}

Index.propTypes = {
  stationList: array
}

Index.getInitialProps = async ctx => {
  const response = await fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
  const data = await response.json()

  const alertResponse = await fetch('https://api.bart.gov/api/bsa.aspx?cmd=bsa&key=MW9S-E7SL-26DU-VV8V&json=y')
  const alertResponseData = await alertResponse.json()

  return { stationList: data.root.stations.station }
}

export default Index
