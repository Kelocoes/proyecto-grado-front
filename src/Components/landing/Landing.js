import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

import FormEstimation from '../EstimationComponent/FormEstimation'

import Header from './Header'
import MainFeaturedPost from './MainFeaturedPost'
import Footer from './Footer'

export default function Landing () {
  return (

    <Container >
      <CssBaseline />
      <Container maxWidth="lg" >
        <Header title="Riesgo cardiovascular UV"/>
        <MainFeaturedPost />
        <FormEstimation />
        <Footer
          title="Créditos"
          description="Desarrollado por Kevin David Rodríguez Belalcázar"
          contact = "kevin.david.rodriguez@correounivalle.edu.co"
        />
      </Container>

    </Container>
  )
}