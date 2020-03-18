import React from 'react'
import logo from './logo.svg'
import './App.css'

function App(): React.FunctionComponentElement<{}> {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="alert alert-success" role="alert">
          <p>Zombie Roleplaying Application coming soon!</p>
        </div>
      </header>
    </div>
  )
}

export default App
