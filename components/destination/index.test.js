import React from 'react'
import { shallow } from 'enzyme'
import Destination from './'

describe('Destination', () => {
  it('renders without props', () => {
    shallow(<Destination />)
  })
})
