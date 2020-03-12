import React from 'react'
import { shallow } from 'enzyme'
import IndexPage from './'

describe('IndexPage', () => {
  it('renders without props', () => {
    shallow(<IndexPage />)
  })
})
