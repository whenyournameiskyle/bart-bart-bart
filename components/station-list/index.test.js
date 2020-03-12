import React from 'react'
import { shallow } from 'enzyme'
import StationList from './'

describe('StationList', () => {
  it('renders without props', () => {
    shallow(<StationList />)
  })
})
