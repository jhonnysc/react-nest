import React, { useEffect, useRef } from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'

import { useField } from '@unform/core'

interface Props extends SelectProps<OptionTypeBase> {
  name: string
}

const Select: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: SelectProps<OptionTypeBase>) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return []
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value)
        }
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value
      },
    })
  }, [fieldName, registerField, rest.isMulti])
  return (
    <ReactSelect
      error={!!error}
      defaultValue={defaultValue}
      variant="outlined"
      classNamePrefix="react-select"
      ref={selectRef}
      {...rest}
    />
  )
}
export default Select
