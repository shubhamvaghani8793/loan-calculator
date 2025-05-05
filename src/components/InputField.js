import { TextField } from '@mui/material'
import React from 'react'

function InputField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  helperText,
}) {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      margin="normal"
    />
  )
}

export default InputField