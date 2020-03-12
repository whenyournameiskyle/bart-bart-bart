import React from 'react'
import { shallow } from 'enzyme'
import SelectedStation from './'

describe('SelectedStation', () => {
  it('renders without props', () => {
    shallow(<SelectedStation />)
  })
})
