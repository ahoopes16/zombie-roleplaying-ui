import React from 'react'
import './App.css'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import ListEncounters from './components/ListEncounters'
import CreateEncounterForm from './components/CreateEncounterForm'

function App(): React.FunctionComponentElement<{}> {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={CreateEncounterForm} />
          <Route exact path="/encounters" component={ListEncounters} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
