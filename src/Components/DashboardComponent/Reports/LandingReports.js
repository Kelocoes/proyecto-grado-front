import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link as LinkRouter } from 'react-router-dom'
import Fade from '@mui/material/Fade'

import CheckLocation from '../../../Utils/CheckLocation'
import generalReportsUrl from '../../../assets/generalReports.png'
import anonymousTableUrl from '../../../assets/anonymousTable.png'

export default function LandingReports (props) {
  // CONSTANTS

  const { type } = props

  const nav = useNavigate()
  useEffect(() => {
    if (CheckLocation()) {
      nav('/')
    }
  }, [])

  return (
    <Container
      maxWidth="lg"
      sx={{ marginTop: 7 }}
    >
      <Fade in={true}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={type === 'admin' ? 0 : 4} />
          <Grid item xs={12} sm={4} >
            <Card align="center" sx={{ boxShadow: 10 }}>
              <CardActionArea component={LinkRouter} to={'general'}>
                <CardMedia
                  component="img"
                  height="160"
                  sx={{ width: '140px' }}
                  image={generalReportsUrl}
                />
                <CardContent>
                  <Typography align='center' variant='h6'>
                    Reporte de estimaciones general
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {type === 'admin' &&
            <Grid item xs={12} sm={4} >
              <Card align="center" sx={{ boxShadow: 10 }}>
                <CardActionArea component={LinkRouter} to={'tableanonymous'}>
                  <CardMedia
                    component="img"
                    height="160"
                    sx={{ width: '160px' }}
                    image={anonymousTableUrl}
                  />
                  <CardContent>
                    <Typography align='center' variant='h6'>
                      Tabla de estimaciones anónimas
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          }
          {type === 'admin' &&
            <Grid item xs={12} sm={4} >
              <Card align="center" sx={{ boxShadow: 10 }}>
                <CardActionArea component={LinkRouter} to={'tabletraining'}>
                  <CardMedia
                    component="img"
                    height="160"
                    sx={{ width: '160px' }}
                    image={anonymousTableUrl}
                  />
                  <CardContent>
                    <Typography align='center' variant='h6'>
                      Estimaciones para entrenamiento
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          }
        </Grid>
      </Fade>
    </Container>
  )
}
