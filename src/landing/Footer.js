import * as React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function Copyright () {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Universidad del Valle, Escuela de Ingeniería de Sistemas y Computación, '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function Footer (props) {
  const { description, title } = props

  return (
    <Card sx = {{ boxShadow: 5, py: 2, overflow: 'auto' }}>
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
        <Copyright />
      </Container>
    </Card>
  )
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Footer
