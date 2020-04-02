import React from 'react'
import './App.css'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import ListEncounters from './components/encounters/ListEncounters'
import CreateEncounterForm from './components/encounters/CreateEncounterForm'

function App(): React.FunctionComponentElement<{}> {
  return (
    <div>
      <HashRouter>
        <NavigationBar />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/encounters" component={ListEncounters} />
            <Route
              exact
              path="/encounters/create"
              component={CreateEncounterForm}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </HashRouter>
    </div>
  )
}

export default App
