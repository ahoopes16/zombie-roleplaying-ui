import React from 'react'
import './App.css'
import ListEncounters from './components/ListEncounters'
import CreateEncounterForm from './components/CreateEncounterForm'

function App(): React.FunctionComponentElement<{}> {
  return (
    <div className="App">
      <ListEncounters />
      <CreateEncounterForm />
    </div>
  )
}

export default App
