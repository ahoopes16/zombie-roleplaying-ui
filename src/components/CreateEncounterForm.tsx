import React, { FormEvent, FunctionComponentElement, useState } from 'react'
import api from '../api'
import Swal from 'sweetalert2'
import { NavLink } from 'react-router-dom'
import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Button
} from 'reactstrap'

function CreateEncounterForm(): FunctionComponentElement<{}> {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onClick = async (event: FormEvent<HTMLInputElement>): Promise<void> => {
    event.preventDefault()

    const body = { title, description }
    try {
      const { result } = await api.createEncounter(body)

      Swal.fire({
        title: `Encounter "${result.title}" successfully created!`,
        text: "Can't wait to see who gets that one :D",
        icon: 'success'
      })

      setTitle('')
      setDescription('')
    } catch (error) {
      console.error(error)
      Swal.fire({
        title: "Sorry, we couldn't create your encounter!",
        text: error.message,
        icon: 'error'
      })
    }
  }

  const updateTitle = (event: FormEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setTitle(event.currentTarget.value)
  }

  const updateDesc = (event: FormEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setDescription(event.currentTarget.value)
  }

  const isDisabled = (): boolean => !title || !description

  return (
    <Card className="form-container text-center">
      <CardTitle tag="h2">Create an Encounter!</CardTitle>

      <CardBody>
        <Form>
          <Col>
            <FormGroup className="form-field">
              <Input
                id="create-encounter-title-input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={updateTitle}
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
                value={description}
                onChange={updateDesc}
              />
            </FormGroup>
          </Col>

          <Button color="primary" onClick={onClick} disabled={isDisabled()}>
            Create Encounter
          </Button>
        </Form>
      </CardBody>

      <CardFooter>
        <NavLink to="/encounters">List of Encounters</NavLink>
      </CardFooter>
    </Card>
  )
}

export default CreateEncounterForm
