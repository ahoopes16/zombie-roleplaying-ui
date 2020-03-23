import React from 'react'

function CreateEncounterForm(): React.FunctionComponentElement<{}> {
  return (
    <form>
      <div className="form-group">
        <input
          id="title-input"
          type="text"
          className="form-control"
          placeholder="Title"
          aria-describedby="title-help"
        />
        <small id="title-help" className="form-text text-muted">
          Please make sure your title is unique!
        </small>
      </div>

      <div className="form-group">
        <textarea
          id="description-input"
          className="form-control"
          rows={3}
          placeholder="Description"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}

export default CreateEncounterForm
