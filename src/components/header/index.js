import React from 'react'
import '../../style.css'

class Header extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className='header'>
        {this.props.showBackButton 
          ? <button className='backButton' onClick={this.props.onClick}>{'←'}</button>
          : null
        }
        <div className='headerText'>{this.props.text}</div>
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

