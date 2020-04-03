import React, { FunctionComponentElement, useState, useEffect } from 'react'
import { RouterProps } from '../../types/reactRouterProps'
import { Encounter } from '../../types/encounter.type'
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

  const isDisabled = (): boolean => !encounter.title || !encounter.description

  return (
    <Card className="form-container text-center">
      <CardHeader>
        <CardTitle tag="h2">Edit Encounter</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Col>
            <FormGroup className="form-field">
              <Input
                id="create-encounter-title-input"
                type="text"
                placeholder="Title"
                value={encounter.title}
                onChange={(e): string =>
                  (encounter.title = e.currentTarget.value)
                }
              />
              <FormText color="muted" className="float-left">
                Please make sure the title is unique!
              </FormText>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup className="form-field">
              <Input
                id="create-encounter-description-input"
                type="textarea"
                placeholder="Description"
                value={encounter.description}
                onChange={(e): string =>
                  (encounter.description = e.currentTarget.value)
                }
              />
            </FormGroup>
          </Col>

          <Button color="primary" disabled={isDisabled()}>
            Update Encounter
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default EditEncounterForm
