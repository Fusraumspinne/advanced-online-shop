import React from 'react'
import { Form } from 'react-bootstrap'

function Textarea({placeholder, rows, onChange}) {
  return (
    <Form.Control
      as="textarea"  
      placeholder={placeholder}
      rows={rows}
      onChange={onChange}
    />
  )
}

export default Textarea