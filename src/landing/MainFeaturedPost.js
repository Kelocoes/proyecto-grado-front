import * as React from 'react'
// import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import imageUrl from '../assets/doctor-model.png'

export default function MainFeaturedPost (props) {
  const title = 'Estimación de riesgo cardiovascular'
  // eslint-disable-next-line
  const description = "Mediante el poder de las redes neuronales y la inteligencia artificial, nuestra innovadora herramienta, \
  diseñada específicamente para pacientes colombianos, te proporciona una evaluación precisa y personalizada del riesgo cardiovascular \
  que podrías enfrentar en función de tus características individuales. Al combinar datos demográficos, factores de estilo de vida, \
  antecedentes médicos y otros indicadores relevantes dentro del contexto colombiano, nuestro algoritmo de vanguardia analiza y procesa \
  esta información para ofrecerte un puntaje objetivo y confiable de tu riesgo cardiovascular."

  return (
    <Card sx = {{ boxShadow: 5, marginBottom: 3, marginTop: 2 }}>
      <Grid container alignItems = "center" >
        <Grid item xs = {12} md = {10} >
          <CardContent sx = {{ marginRight: 2 }}>
            <Typography variant = "h5" color = "inherit" justifyContent= "center" padding = "10">
              {title}
            </Typography>
            <Typography variant = "body1" color = "inherit" paragraph align = "justify">
              {description}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs = {12} md = {2} textAlign = "center" sx={{ display: 'flex', justifyContent: 'center' }}>
          <CardMedia
            sx = {{ width: { xs: '200px' }, paddingRight: 3 }}
            component ="img"
            image = {imageUrl}
            alt = "Doctor Model"
          />
        </Grid>
      </Grid>

    </Card>
  )
}
