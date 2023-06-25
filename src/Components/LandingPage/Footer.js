import * as React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Copyright from '../Copyright/Copyright'

export default function Footer (props) {
  const { description, title, contact } = props

  return (
    <Card sx={{ boxShadow: 5, paddingY: 2, overflow: 'auto' }}>
      <Container >
        <Typography variant="h6" align="center">
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <Typography
          variant="subtitle2"
          align="center"
          color="text.secondary"
          component="p"
        >
          Contacto: {contact}
        </Typography>
        <Copyright />
      </Container>
    </Card>
  )
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
