import React from 'react'
import {
  Card,
  CardTitle,
  CardBody,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Button
} from 'reactstrap'

function CreateEncounterForm(): React.FunctionComponentElement<{}> {
  return (
    <Card body className="form-container text-center">
      <CardTitle tag="h2">Create an Encounter!</CardTitle>
      <CardBody>
        <Form>
          <Col>
            <FormGroup className="form-field">
              <Input type="text" placeholder="Title" />
              <FormText color="muted" className="float-left">
                Please make sure the title is unique!
              </FormText>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup className="form-field">
              <Input type="textarea" placeholder="Description" />
            </FormGroup>
          </Col>

          <Button color="primary">Create Encounter</Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default CreateEncounterForm
