import React from 'react'
import styled from '@emotion/styled'

import Station from './components/station'
import StationList from './components/station-list'
import Header from './components/header'

export default class App extends React.Component {
  state = {
    stationList: [],
    selectedStation: null,
    loading: false,
    error: null
  }

  fetchStations() {
    this.setState({loading : true}, () => {
      return fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({stationList : responseJson.root.stations.station, loading: false})
      })
      .catch((error) => {
        this.setState({error : error})
      })
    })
  }

  handleStationClick = (stationAbbr) => {
    this.setState({selectedStation : stationAbbr})
  }

  toStationList = () => {
    this.setState({selectedStation : null})
  }

  componentDidMount() {
    this.fetchStations()
  }

  render() {
    const {
      loading,
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
              onClick={this.handleStationClick}
              stationList={stationList}
            />
        }
      </AppBody>
    )
  }
}
//#4682b4;
const AppBody = styled.div`
  background-color: #111;
  color: #ddd;
  font-family: Helvetica, sans-serif;
  font-size: 1.5rem;
  text-align: center;
  height: 100%;

  @media(max-width: 768px) { 
    font-size: 1.6rem;
  }
`
