import { RouterProps } from '../../types/reactRouterProps'
import { Encounter } from '../../types/encounter.type'
import moment from 'moment'
import Swal from 'sweetalert2'
import api from '../../api'
import { Redirect } from 'react-router-dom'
import React, {
  FunctionComponentElement,
  ReactElement,
  useState,
  useEffect,
  FormEvent
} from 'react'
import {
  Alert,
  Spinner,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormText,
  Button
} from 'reactstrap'

function EditEncounterForm(
  props: RouterProps
): FunctionComponentElement<RouterProps> {
  const { id } = props.match.params
  const [encounter, setEncounter] = useState<Encounter>()
  const [error, setError] = useState<Error>()
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    async function fetchEncounter(): Promise<void> {
      try {
        const { result } = await api.getEncounter(id)
        setEncounter(result)
      } catch (err) {
        setError(err)
      }
    }

    fetchEncounter()
  }, [id])

  const updateEncounter = async (
    e: FormEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault()

    if (!encounter) {
      return
    }

    try {
      const { result } = await api.updateEncounter(id, encounter)

      Swal.fire({
        title: `Encounter "${result.title}" successfully updated!`,
        icon: 'success'
      })

      setEncounter(result)
    } catch (error) {
      console.error(error)
      Swal.fire({
        title: "Sorry, we couldn't update your encounter!",
        text: error.message,
        icon: 'error'
      })
    }
  }

  const deleteEncounter = async (
    e: FormEvent<HTMLInputElement>
  ): Promise<void | ReactElement> => {
    e.preventDefault()

    if (!encounter) {
      return
    }

    Swal.fire({
      title: `Are you sure you want to delete "${encounter.title}"?`,
      text: "There's no going back!",
      showCancelButton: true,
      confirmButtonText: 'Delete it!',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const { result } = await api.deleteEncounter(id)

          Swal.fire({
            title: `Successfully deleted "${result.title}"!`,
            text: "You'll never see that stupid encounter again...",
            icon: 'success'
          })

          setRedirect(true)
        } catch (error) {
          Swal.fire({
            title: "Sorry, we couldn't delete your encounter!",
            text: error.message,
            icon: 'error'
          })
        }
      }
    })
  }

  if (redirect) {
    return <Redirect to="/encounters" />
  }

  const isDisabled = (): boolean => !encounter?.title || !encounter?.description

  const getCardBody = (): ReactElement => {
    if (error) {
      return (
        <Alert className="error-container text-center" color="danger">
          {error.message}
        </Alert>
      )
    }

    if (!encounter) {
      return (
        <div className="text-center">
          <Spinner color="dark" />
        </div>
      )
    }

    return (
      <Form>
        <Col>
          <FormGroup className="form-field">
            <Label for="edit-encounter-title-input">Title</Label>
            <Input
              id="edit-encounter-title-input"
              type="text"
              value={encounter.title}
              onChange={(e): void =>
                setEncounter({ ...encounter, title: e.currentTarget.value })
              }
            />
            <FormText color="muted" className="float-left">
              Please make sure the title is unique!
            </FormText>
          </FormGroup>
        </Col>

        <Col>
          <FormGroup className="form-field">
            <Label for="edit-encounter-description-input">Description</Label>
            <Input
              id="edit-encounter-description-input"
              type="textarea"
              value={encounter.description}
              onChange={(e): void =>
                setEncounter({
                  ...encounter,
                  description: e.currentTarget.value
                })
              }
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup className="form-field">
            <Label for="edit-encounter-times-used">Times Used</Label>
            <Input
              id="edit-encounter-times-used"
              type="number"
              value={encounter.numberOfRuns}
              disabled
            />
          </FormGroup>
        </Col>

        <Row className="text-center">
          <Col>
            <Button
              color="primary"
              onClick={updateEncounter}
              disabled={isDisabled()}
            >
              Update Encounter
            </Button>
          </Col>
          <Col>
            <Button color="danger" onClick={deleteEncounter}>
              Delete Encounter
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }

  return (
    <Card className="form-container">
      <CardHeader className="text-center">
        <CardTitle tag="h2">Edit Encounter</CardTitle>
      </CardHeader>

      <CardBody>{getCardBody()}</CardBody>

      <CardFooter>
        <Row className="text-center">
          <Col>Created: {moment(encounter?.createdAt).fromNow()}</Col>
          <Col>Last Edited: {moment(encounter?.updatedAt).fromNow()}</Col>
        </Row>
      </CardFooter>
    </Card>
  )
}

export default EditEncounterForm
