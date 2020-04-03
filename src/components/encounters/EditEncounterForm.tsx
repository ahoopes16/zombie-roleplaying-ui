import React, { FunctionComponentElement, useState, useEffect } from 'react'
import { RouterProps } from '../../types/reactRouterProps'
import { Encounter } from '../../types/encounter.type'
import api from '../../api'

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

  console.error(error)
  console.log(encounter?.title)
  return <p>{encounter?.title}</p>
}

export default EditEncounterForm
