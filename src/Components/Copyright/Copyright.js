import * as React from 'react'
import Typography from '@mui/material/Typography'

export default function Copyright () {
  return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Universidad del Valle, Escuela de Ingeniería de Sistemas y Computación, '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
  )
}
