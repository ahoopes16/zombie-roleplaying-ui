import React, {
  FunctionComponentElement,
  useState,
  useEffect,
  FormEvent
} from 'react'
import { RouterProps } from '../../types/reactRouterProps'
import { Encounter } from '../../types/encounter.type'
import moment from 'moment'
import Swal from 'sweetalert2'
import api from '../../api'
import {
  Alert,
  Spinner,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Col,
  FormGroup,
  Label,
  Input,
  FormText,
  Button
} from 'reactstrap'

const format = 'YYYY-MM-DD'

function EditEncounterForm(
  props: RouterProps
): FunctionComponentElement<RouterProps> {
  const { id } = props.match.params
  const [encounter, setEncounter] = useState<Encounter>()
  const [error, setError] = useState<Error>()

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

  if (error) {
    return (
      <Alert className="error-container" color="danger">
        {error.message}
      </Alert>
    )
  }

  if (!encounter) {
    return <Spinner color="primary" />
  }

  const onClick = async (event: FormEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault()

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

  const isDisabled = (): boolean => !encounter.title || !encounter.description

  return (
    <Card className="form-container">
      <CardHeader className="text-center">
        <CardTitle tag="h2">Edit Encounter</CardTitle>
      </CardHeader>

      <CardBody>
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

          <Col>
            <FormGroup className="form-field">
              <Label for="edit-encounter-created-at-date">Created At</Label>
              <Input
                id="edit-encounter-created-at-date"
                type="date"
                value={moment(encounter.createdAt).format(format)}
                disabled
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup className="form-field">
              <Label for="edit-encounter-updated-at-date">
                Last Updated At
              </Label>
              <Input
                id="edit-encounter-updated-at-date"
                type="date"
                value={moment(encounter.updatedAt).format(format)}
                disabled
              />
            </FormGroup>
          </Col>

          <div className="text-center">
            <Button color="primary" onClick={onClick} disabled={isDisabled()}>
              Update Encounter
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default EditEncounterForm
