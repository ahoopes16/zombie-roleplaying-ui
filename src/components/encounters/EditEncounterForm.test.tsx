import React from 'react'
import { shallow } from 'enzyme'
import EditEncounterForm from './EditEncounterForm'

const mockProps = (): { params: { [key: string]: string } } => {
  return { params: { id: 'test-id' } }
}

// TODO Figure out how to do more tests
describe('EditEncounterForm', () => {
  test('renders', () => {
    shallow(<EditEncounterForm match={mockProps()} />)
  })
})
