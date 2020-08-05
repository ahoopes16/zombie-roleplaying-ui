import React, {
  FunctionComponentElement,
  useState,
  useEffect,
  ReactElement
} from 'react'
import { Encounter } from '../../types/encounter.type'
import { Link, NavLink } from 'react-router-dom'
import api from '../../api'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  Spinner
} from 'reactstrap'

function ListEncounters(): FunctionComponentElement<{}> {
  const [encounters, setEncounters] = useState<Encounter[]>([])
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    async function fetchEncounters(): Promise<void> {
      try {
        const { result } = await api.getEncounters()
        setEncounters(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
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

    if (loading) {
      return (
        <div className="text-center">
          <Spinner color="dark" />
        </div>
      )
    }

    if (!encounters.length) {
      return (
        <Alert color="info" className="text-center">
          It looks like no encounters have been created yet! Click the New
          Encounter button above to get started.
        </Alert>
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
        <Container>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col>
              <CardTitle tag="h2" className="text-center">
                Encounters
              </CardTitle>
            </Col>
            <Col></Col>
            <Col>
              <NavLink to="/create-encounter">
                <Button color="success">+ New Encounter</Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </CardHeader>

      <CardBody>{getCardBody()}</CardBody>
    </Card>
  )
}

export default ListEncounters
