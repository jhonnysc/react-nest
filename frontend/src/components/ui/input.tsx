import React, { useEffect, useRef } from 'react'

import { TextField, TextFieldProps } from '@material-ui/core'
import { useField } from '@unform/core'

interface Props {
  name: string
  label?: string
}
type InputProps = JSX.IntrinsicElements['input'] & Props

const Input: React.FC<InputProps & TextFieldProps> = ({
  name,
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    })
  }, [fieldName, registerField])
  return (
    <TextField
      error={!!error}
      label={label}
      defaultValue={defaultValue}
      helperText={error}
      variant="outlined"
      inputRef={inputRef}
      {...rest}
    />
  )
}
export default Input
