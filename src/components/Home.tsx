import React, { FunctionComponentElement } from 'react'
import { Jumbotron } from 'reactstrap'

function Home(): FunctionComponentElement<{}> {
  return (
    <Jumbotron className="app-container">
      <h1 className="display-3 text-center">Welcome to the Zombie RPG 3000!</h1>
      <p className="lead mt-5">
        Have you ever felt like there wasn&apos;t enough death and destruction
        in your neighborhood? Now there can be!
      </p>
      <hr className="mb-5" />
      <p>
        Imagine your world as it is now, except it is overrun by zombies. Sounds
        like a blast, right?
      </p>
    </Jumbotron>
  )
}

export default Home
