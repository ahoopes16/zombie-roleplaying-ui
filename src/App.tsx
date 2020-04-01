import React from 'react'
import './App.css'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import ListEncounters from './components/ListEncounters'
import CreateEncounterForm from './components/CreateEncounterForm'

function App(): React.FunctionComponentElement<{}> {
  return (
    <div>
      <HashRouter>
        <NavigationBar />
        <div className="App">
          <Switch>
            <Route exact path="/" component={CreateEncounterForm} />
            <Route exact path="/encounters" component={ListEncounters} />
            <Redirect to="/" />
          </Switch>
        </div>
      </HashRouter>
    </div>
  )
}

export default App
