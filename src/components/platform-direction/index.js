import React from 'react'
import '../../style.css'

import Destination from '../../components/destination'

class PlatformDirection extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div>
        <div className='header subheader directionHeader'>{this.props.direction}</div>
          {this.props.destinations.map((destination, idx) => {
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

PlatformDirection.propTypes = {
  direction: React.PropTypes.string,
  destinations: React.PropTypes.array
}

export default PlatformDirection

