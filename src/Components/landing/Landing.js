import * as React from 'react'
import Container from '@mui/material/Container'

import FormEstimation from '../EstimationComponent/FormEstimation'

import Header from './Header'
import MainFeaturedPost from './MainFeaturedPost'
import Footer from './Footer'

export default function Landing (props) {
  return (
    <Container >
      <Container maxWidth="lg" >
        <Header
          title="Riesgo cardiovascular UV"
          actualTheme={props.actualTheme}
          setActualTheme={props.setActualTheme}
        />
        <MainFeaturedPost />
        <FormEstimation />
        <Footer
          title="Créditos"
          description="Desarrollado por Kevin David Rodríguez Belalcázar"
          contact="kevin.david.rodriguez@correounivalle.edu.co"
        />
      </Container>
    </Container>
  )
}
