import React from 'react';

function Input({ type, placeholder, disabled, onChange, isLabel, contentLabel, extraClass }) {
  return (
    <div className={extraClass}>
      {isLabel && (
        <label for="input" class="form-label fs-5">{contentLabel}</label>
      )}
      <div className="input-group">
        <input id='input' type={type} className="form-control" placeholder={placeholder} disabled={disabled} onChange={onChange}/>
      </div>
    </div>
  );
}

export default Input;