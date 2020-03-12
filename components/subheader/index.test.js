import React from 'react'
import { shallow } from 'enzyme'
import Subheader from './'

describe('Subheader', () => {
  it('renders without props', () => {
    shallow(<Subheader />)
  })
})
