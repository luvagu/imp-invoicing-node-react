import React, { FC } from 'react'
import { Text } from '@react-pdf/renderer'
import compose from '../styles/compose'

export default function EditableInput({ className, placeholder, value, onChange, pdfMode }) {
  return (
    <>
      {pdfMode ? (
        <Text style={compose('span ' + (className ? className : ''))}>{value}</Text>
      ) : (
        <input
          type="text"
          className={'input ' + (className ? className : '')}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </>
  )
}
