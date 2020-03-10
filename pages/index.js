import React  from 'react'
import fetch from 'isomorphic-unfetch'
import StationList from '../components/station-list'

const Index = ({ stationList }) => <StationList stationList={stationList} />

Index.getInitialProps = async ctx => {
  const response = await fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
  const data = await response.json()
  return { stationList: data.root.stations.station }
}

export default Index
