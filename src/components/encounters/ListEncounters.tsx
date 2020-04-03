import React, { FunctionComponentElement, useState, useEffect } from 'react'
import { Encounter } from '../../types/encounter.type'
import api from '../../api'
import {
  Alert,
  Spinner,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
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
    return (
      <Alert className="error-container" color="danger">
        {error.message}
      </Alert>
    )
  }

  if (!encounters) {
    return <Spinner color="primary" />
  }

  return (
    <Card className="app-container">
      <CardHeader>
        <CardTitle tag="h2" className="text-center">
          Encounters
        </CardTitle>
      </CardHeader>

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
    </Card>
  )
}

export default ListEncounters
