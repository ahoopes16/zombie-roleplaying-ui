import React, {
  FunctionComponentElement,
  useState,
  useEffect,
  ReactElement
} from 'react'
import { Encounter } from '../../types/encounter.type'
import { Link } from 'react-router-dom'
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

  const getCardBody = (): ReactElement => {
    if (error) {
      return (
        <Alert className="error-container text-center" color="danger">
          {error.message}
        </Alert>
      )
    }

    if (!encounters.length) {
      return (
        <div className="text-center">
          <Spinner color="dark" />
        </div>
      )
    }

    return (
      <ListGroup>
        {encounters.map((encounter, i) => (
          <ListGroupItem key={`encounter-${i}`}>
            <ListGroupItemHeading>
              <Link to={`/encounters/${encounter._id}`}>{encounter.title}</Link>
            </ListGroupItemHeading>
            <ListGroupItemText>{encounter.description}</ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    )
  }

  return (
    <Card className="app-container">
      <CardHeader>
        <CardTitle tag="h2" className="text-center">
          Encounters
        </CardTitle>
      </CardHeader>

      <CardBody>{getCardBody()}</CardBody>
    </Card>
  )
}

export default ListEncounters
