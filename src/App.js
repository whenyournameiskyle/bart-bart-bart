import React from 'react'
import queryString from 'query-string'
import styled from '@emotion/styled'

import Station from './components/station'
import StationList from './components/station-list'

export default class App extends React.Component {
  state = {
    selectedStation: null,
    stationList: [],
  }

  fetchStationList() {
    this.setState({loading : true}, () => {
      return fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          stationList: responseJson.root.stations.station
        })
      })
      .catch((error) => error)
    })
  }

  handleClickOnSpecificStation = (stationAbbr) => {
    const params = new URLSearchParams('')
    params.append('selectedStation', stationAbbr)
    this.setState({selectedStation: stationAbbr})
    window.history.replaceState({}, null, `index?${params.toString()}`)
  }

  toStationList = () => {
    this.setState({selectedStation: null})
    window.history.replaceState({}, '', window.location.origin+window.location.pathname)
    if (!this.state.stationList.length) {
      this.fetchStationList()
    }
  }

  componentDidMount() {
    const params = queryString.parse(window.location.search) || {}
    if (params.selectedStation) {
      this.setState({selectedStation: params.selectedStation})
    } else {
      this.fetchStationList()
    }
  }

  render() {
    const {
      selectedStation,
      stationList,
    } = this.state

    return (
      <AppBody>
        {selectedStation
          ? <Station
              stationAbbr={selectedStation}
              onBackClick={this.toStationList}
            />
          : <StationList
              onClick={this.handleClickOnSpecificStation}
              stationList={stationList}
            />
        }
      </AppBody>
    )
  }
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
`
