import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link as LinkRouter } from 'react-router-dom'
import Fade from '@mui/material/Fade'

import patientsUrl from '../../../assets/patientsImage.png'
import medicsUrl from '../../../assets/medicImage.png'
import estimationUrl from '../../../assets/estimationImage.png'
import reportsUrl from '../../../assets/reportsImage.png'
import profileUrl from '../../../assets/profileImage.png'

export default function LandingDashboard (props) {
  // CONSTANTS

  const { type, setTitleAppBar } = props

  useEffect(() => {
    setTitleAppBar('Inicio')
  }, [])

  return (
    <Container
      maxWidth="md"
      sx={{ marginTop: 2 }}
    >
      <Fade in={true}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} >
            <Card align="center" sx={{ boxShadow: 10 }}>
              <CardActionArea component={LinkRouter} to={'patients'}
                onClick={() => { setTitleAppBar('Gestión de pacientes') }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  sx={{ width: '160px' }}
                  image={patientsUrl}
                />
                <CardContent>
                  <Typography align='center' variant='h6'>
                    Gestión de pacientes
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {type === 'admin' &&
            <Grid item xs={12} sm={6} >
              <Card align="center" sx={{ boxShadow: 10 }}>
                <CardActionArea component={LinkRouter} to={'medics'}
                  onClick={() => { setTitleAppBar('Gestión de médicos') }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    sx={{ width: '160px' }}
                    image={medicsUrl}
                  />
                  <CardContent>
                    <Typography align='center' variant='h6'>
                      Gestión de médicos
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          }
          <Grid item xs={12} sm={6} >
            <Card align="center" sx={{ boxShadow: 10 }}>
              <CardActionArea component={LinkRouter} to={'estimation'}
                onClick={() => { setTitleAppBar('Estimación') }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  sx={{ width: '160px' }}
                  image={estimationUrl}
                />
                <CardContent>
                  <Typography align='center' variant='h6'>
                    Estimación
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Card align="center" sx={{ boxShadow: 10 }}>
              <CardActionArea component={LinkRouter} to={'reports'}
                onClick={() => { setTitleAppBar('Reportes') }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  sx={{ width: '200px' }}
                  image={reportsUrl}
                />
                <CardContent>
                  <Typography align='center' variant='h6'>
                    Reportes
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={type === 'admin' ? 12 : 6}>
            <Card align="center" sx={{ boxShadow: 10 }}>
              <CardActionArea component={LinkRouter} to={'profile'}
                onClick={() => { setTitleAppBar('Perfil') }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  sx={{ width: '160px' }}
                  image={profileUrl}
                />
                <CardContent>
                  <Typography align='center' variant='h6'>
                    Perfil
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Fade>
    </Container>
  )
}
