import React, { useEffect, useState }  from 'react'
import queryString from 'query-string'
import styled from '@emotion/styled'

import Station from '../components/station'
import StationList from '../components/station-list'

const App = () => {
  const [selectedStation, setSelectedStation] = useState('')
  const [stationList, setStationList] = useState([])

  const fetchStationList = () => {
    return fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
    .then((response) => response.json())
    .then((responseJson) => {
      setStationList(responseJson.root.stations.station)
    })
    .catch((error) => console.error(error.message))
  }

  const handleClickOnSpecificStation = (stationAbbr) => {
    const params = new URLSearchParams('')
    params.append('selectedStation', stationAbbr)
    setSelectedStation(stationAbbr)
    window.history.pushState({}, null, `index?${params.toString()}`)
  }

  const backToStationList = () => {
    setSelectedStation('')
    window.history.pushState({}, '', window.location.origin+window.location.pathname)
  }

  useEffect(() => {
    debugger
    const params = queryString.parse(window.location.search) || {}
    if (selectedStation && (selectedStation !== params.selectedStation)) {
      setSelectedStation(selectedStation)
    } else {
      fetchStationList()
    }
  }, [selectedStation])

  return (
    <div>
      <style jsx>{`
        :global(body) {
          background-color: #333;
          color: #ddd;
          font-family: Open Sans, Avenir Next, Avenir, Helvetica, sans-serif;
          height: 100%;
          margin: 0;
          text-align: center;
        }
      `}
      </style>
      <AppBody>
        {selectedStation
          ? <Station
              stationAbbr={selectedStation}
              onBackClick={backToStationList}
            />
          : <StationList
              onClick={handleClickOnSpecificStation}
              stationList={stationList}
            />
        }
      </AppBody>
    </div>
  )
}

//#4682b4;
const AppBody = styled.div`
  color: #ddd;
  font-family: Helvetica, sans-serif;
  font-size: 1.5rem;
  height: 100%;
  margin: 0 auto;
  max-width: 50rem;
  text-align: center;

  @media(max-width: 768px) {
    font-size: 1.6rem;
  }

  @media(max-width: 368px) {
    font-size: 1.8rem;
  }
`

export default App
