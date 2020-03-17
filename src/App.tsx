import React from 'react'
import logo from './logo.svg'
import './App.css'

function App(): React.FunctionComponentElement<{}> {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Zombie Roleplaying Application coming soon!</p>
      </header>
    </div>
  )
}

export default App
