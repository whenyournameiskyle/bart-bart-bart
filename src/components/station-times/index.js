import React from 'react'
import '../../style.css'

import Destination from '../../components/destination'

class StationTimes extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div>
        <div className='header subheader directionHeader'>Northbound</div>
          {this.props.selectedStation.northbound.map((destination, idx) => {
            return (
              <Destination
                key={idx}
                destination={destination}
              />
            )
          })}
        <div className='header subheader directionHeader'>Southbound</div>
          {this.props.selectedStation.southbound.map((destination, idx) => {
            return (
              <Destination
                key={idx}
                destination={destination}
              />
            )
          })}
      </div>
    )
  }
}

StationTimes.propTypes = {
  selectedStation: React.PropTypes.object,
}

export default StationTimes

