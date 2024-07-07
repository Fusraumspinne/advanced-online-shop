import React from 'react';

function Input({ type, placeholder, disabled, onChange }) {
  return (
    <div className="input-group">
      <input type={type} className="form-control" placeholder={placeholder} disabled={disabled} onChange={onChange}/>
    </div>
  );
}

export default Input;