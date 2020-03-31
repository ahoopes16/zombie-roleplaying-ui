import React, { FunctionComponentElement, useState, useEffect } from 'react'
import { Encounter } from '../types/encounter.type'
import api from '../api'
import { NavLink } from 'react-router-dom'
import {
  Alert,
  Spinner,
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap'

function ListEncounters(): FunctionComponentElement<{}> {
  const [encounters, setEncounters] = useState<Encounter[]>([])
  const [error, setError] = useState<Error>()

  useEffect(() => {
    async function fetchEncounters(): Promise<void> {
      try {
        const { result } = await api.getEncounters()
        setEncounters(result)
      } catch (err) {
        setError(err)
      }
    }

    fetchEncounters()
  }, [])

  if (error) {
    return <Alert color="danger">{error}</Alert>
  }

  if (!encounters) {
    return <Spinner color="primary" />
  }

  return (
    <Card className="form-container text-center">
      <CardTitle tag="h2">Encounters</CardTitle>

      <CardBody>
        <ListGroup>
          {encounters.map((encounter, i) => (
            <ListGroupItem key={`encounter-${i}`}>
              <ListGroupItemHeading>{encounter.title}</ListGroupItemHeading>
              <ListGroupItemText>{encounter.description}</ListGroupItemText>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>

      <CardFooter>
        <NavLink to="/">Create an Encounter</NavLink>
      </CardFooter>
    </Card>
  )
}

export default ListEncounters
