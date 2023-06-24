import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link as LinkRouter } from 'react-router-dom'
import Fade from '@mui/material/Fade'

import patientsUrl from '../../../assets/patientsImage.svg'
import estimationUrl from '../../../assets/estimationImage.png'
import reportsUrl from '../../../assets/reportsImage.png'
import profileUrl from '../../../assets/profileImage.png'

export default function LandingDashboard (props) {
  const { type } = props
  return (
    <Container
      maxWidth="md"
      sx={{ marginTop: 7 }}
    >
      <Fade in={true}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} >
              <Card sx={{ boxShadow: 10 }}>
                <CardActionArea component={LinkRouter} to={'patients'}>
                  <CardMedia
                    component="img"
                    height="160"
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
              <Card sx={{ boxShadow: 10 }}>
                <CardActionArea component={LinkRouter} to={'medics'}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={patientsUrl}
                  />
                  <CardContent>
                    <Typography align='center' variant='h6'>
                      Gestión de medicos
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          }
          <Grid item xs={12} sm={6} >
            <Card align="center" sx={{ boxShadow: 10 }}>
              <CardActionArea component={LinkRouter} to={'estimation'}>
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
              <CardActionArea component={LinkRouter} to={'reports'}>
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
              <CardActionArea component={LinkRouter} to={'profile'}>
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
