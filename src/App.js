import React from 'react'
import './style.css'

import Station from './components/station'
import StationList from './components/station-list'

class App extends React.Component {
  constructor(props) {
    super()

    this.state = {
      stationList: [],
      selectedStation: null,
      loading: false,
      error: null
    }

    this.handleStationClick = this.handleStationClick.bind(this)
    this.toStationList = this.toStationList.bind(this)
  }

  fetchStations() {
    this.setState({loading : true}, () => {
      return fetch('http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({stationList : responseJson.root.stations.station, loading: false})
      })
      .catch((error) => {
        this.setState({error : error})
      })
    })
  }

  handleStationClick(stationAbbr) {
    this.setState({selectedStation : stationAbbr})
  }

  toStationList() {
    this.setState({selectedStation : null})
  }

  componentDidMount() {
    this.fetchStations()
  }

  render() {
    return (
      <div>
      {this.state.loading
        ? <div className='header'> Loading...</div>
        : <div className='appBody'>
            
            {this.state.selectedStation
              ? <Station 
                  stationAbbr={this.state.selectedStation}
                  onBackClick={this.toStationList}
                />
              : <StationList
                  onClick={this.handleStationClick}
                  stationList={this.state.stationList}
                />
            }
          </div>
      }
      </div>
    )
  }
}

export default App

