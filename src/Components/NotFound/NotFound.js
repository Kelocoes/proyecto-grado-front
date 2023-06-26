import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link as LinkRouter } from 'react-router-dom'

export default function NotFound () {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Typography variant="h1">
        404
      </Typography>
      <Typography variant="h6">
        Página no encontrada
      </Typography>
      <Button
        component = {LinkRouter}
        to = '/'
        variant="contained"
      >
        Volver a la página inicial
      </Button>
    </Box>
  )
}
