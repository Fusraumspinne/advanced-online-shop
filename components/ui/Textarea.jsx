import React from 'react'
import { Form } from 'react-bootstrap'

function Textarea({placeholder, rows, onChange, isLabel, contentLabel, extraClass}) {
  return (
    <div className={extraClass}>
      {isLabel && (
        <label className="form-label fs-5">{contentLabel}</label>
      )}
      <Form.Control
        as="textarea"  
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
        style={{ resize: 'none' }}
        id='textarea'
      />
    </div>
  )
}

export default Textarea