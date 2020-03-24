import React from 'react'
import {
  Container,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Button
} from 'reactstrap'

function CreateEncounterForm(): React.FunctionComponentElement<{}> {
  return (
    <Container id="create-encounter-form" className="border border-dark">
      <Form className="form">
        <Col>
          <FormGroup>
            <Input type="text" placeholder="Title" />
            <FormText color="muted" className="float-left">
              Please make sure the title is unique!
            </FormText>
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Input type="textarea" placeholder="Description" />
          </FormGroup>
        </Col>

        <Button color="primary">Create Encounter</Button>
      </Form>
    </Container>
  )
}

export default CreateEncounterForm
