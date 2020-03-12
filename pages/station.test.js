import React from 'react'
import { shallow } from 'enzyme'
import StationPage from './station'

describe('StationPage', () => {
  it('renders without props', () => {
    shallow(<StationPage />)
  })
})
