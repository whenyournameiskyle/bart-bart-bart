import React from 'react'
import '../../style.css'

class Header extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    let time = new Date()
    let hour = time.getHours() 
    hour = (hour > 12) ? (hour - 12) : (hour === 0 ? (hour + 12) : hour) 
    let minute = time.getMinutes().toString()
    minute = minute.length === 1 ? ('0' + minute) : minute
    time = hour + ':' + minute
    return (
      <div className='headerContainer'>
        {this.props.showBackButton 
          ? <button className='backButton' onClick={this.props.onClick}>{'←'}</button>
          : null
        }
        <div className='headerTextContainer'>
          <div className='headerTime'>{time}</div>
          <div className='headerText'>{this.props.text}</div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  text: React.PropTypes.string,
  showBackButton: React.PropTypes.bool,
  onClick: React.PropTypes.func
}

export default Header

