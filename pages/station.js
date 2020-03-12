import React from 'react'
import { object, string } from 'prop-types'
import fetch from 'isomorphic-unfetch'

import SelectedStation from '../components/selected-station'
import stationPlatformFormatter from '../helpers/station-platform-formatter'

const Station = ({ selectedStation = {}, stationAbbr, stationName }) => {
  return <SelectedStation selectedStation={selectedStation} stationAbbr={stationAbbr} stationName={stationName} />
}

Station.propTypes = {
  selectedStation: object,
  stationAbbr: string,
  stationName: string
}

Station.getInitialProps = async ({ query }) => {
  const { key } = query
  if (!key) {
    return { selectedStation: {}, stationAbbr: '', stationName: '' }
  } else {
    try {
      const response = await fetch(`https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${key}&key=MW9S-E7SL-26DU-VV8V&json=y`)
      const data = await response.json()
      const { etd: destinations, name } = data.root.station[0]
      const formattedStationInfo = stationPlatformFormatter(destinations)
      return { selectedStation: formattedStationInfo, stationAbbr: key, stationName: name }
    } catch (e) {
      console.error(e)
      return { selectedStation: {}, stationAbbr: '', stationName: 'Error Loading Station' }
    }
  }
}

export default Station
