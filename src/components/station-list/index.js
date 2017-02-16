import React from 'react'
import '../../style.css'

import StationButton from '../../components/station-button'
import Header from '../../components/header'

class StationList extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div>
        <Header
          text='Select Station'
        />
        {this.props.stationList.map((station, idx) => {
          return (
            <StationButton
              key={station.abbr}
              onClick={this.props.onClick}
              stationName={station.name}
              stationAbbr={station.abbr}
            />
          )
        })}
      </div>
    )
  }
}

StationList.propTypes = {
  stationList: React.PropTypes.array,
}

export default StationList

