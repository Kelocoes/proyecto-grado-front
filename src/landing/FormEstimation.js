import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import InputAdornment from '@mui/material/InputAdornment';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { useExternalApi } from '../Api/ResultsResponse';
import { useState } from 'react';

export default function MainFeaturedPost() {
  const {handleSubmit: getInfoPatientSubmit,  register: registro } = useForm()
  const {
    getEstimation
  } = useExternalApi()
  const [ estimation, setEstimation] = useState({})


  const title = "Ingresa tus datos aquí"

  const yesno = [{ value: "1", label: 'Sí' }, { value: "0", label: 'No' }]

  const sex = [{ value: "1", label: 'Femenino' }, { value: "0", label: 'Masculino' }]

  const onSubmit = data => {
    getEstimation(data, setEstimation)
  }

  return (
    <Card sx = {{ boxShadow: 5, marginBottom : 3, marginTop: 2}}>
      <Grid container alignItems = "center" >
        <Grid item xs = {7} >
          <CardContent sx = {{marginRight : 2}}>
            <Typography variant = "h5" color = "inherit" justifyContent= "center"  align = "center" padding = "10">
              {title}
            </Typography>
          </CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CardContent sx = {{ width : "300px"}}>
              <form onSubmit = {getInfoPatientSubmit(onSubmit)}>
                <Stack>
                  <TextField  required variant = "outlined" label= "Edad" sx = {{ my : 1 }} type = "number"
                    {...registro('age', { valueAsNumber: true, required: true })}
                  />
                  <TextField  required variant = "outlined" label= "Sexo" sx = {{ my : 1 }} select
                    {...registro('sex', { required: true })}
                    defaultValue=''
                  >
                    {sex.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField  required variant = "outlined" label= "Peso" sx = {{ my : 1 }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                    {...registro('weight', { valueAsNumber: true,  required: true })}
                  />
                  <TextField  required variant = "outlined" label= "Estatura" sx = {{ my : 1 }} type = "number" 
                    InputProps={{
                      startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                    }}
                    {...registro('height', { valueAsNumber: true,  required: true })}
                  />
                  <TextField  required variant = "outlined" label= "Sistólica" sx = {{ my : 1 }} type = "number" 
                    {...registro('systolic', { valueAsNumber: true,  required: true })}
                  />
                  <TextField  required variant = "outlined" label= "Diastólica" sx = {{ my : 1 }} type = "number" 
                    {...registro('diastolic', { valueAsNumber: true,  required: true })}
                  />
                  <TextField  required variant = "outlined" label= "Colesterol total" sx = {{ my : 1 }} type = "number" 
                    {...registro('cholesterol', { valueAsNumber: true,  required: true })}
                  />
                  <TextField  required variant = "outlined" label= "HDL" sx = {{ my : 1 }} type = "number" 
                    {...registro('hdl', { valueAsNumber: true,  required: true })}
                  />
                  <TextField  required variant = "outlined" label= "LDL" sx = {{ my : 1 }} type = "number" 
                    {...registro('ldl', { valueAsNumber: true,  required: true })}
                  />
                  <TextField  required variant = "outlined" label= "Trigliceridos" sx = {{ my : 1 }} type = "number" 
                    {...registro( 'triglycerides', { valueAsNumber: true, required: true })}
                  />
                  <TextField  required variant = "outlined" label= "Fumas" sx = {{ my : 1 }} select
                    {...registro('smoking', { valueAsString: true, required: true })}
                    defaultValue=''
                  >
                    {yesno.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField  required variant = "outlined" label= "Diabetes" sx = {{ my : 1 }} select
                    {...registro('diabetes', { required: true })}
                    defaultValue=''
                  >
                    {yesno.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField  required variant = "outlined" label= "Antecedentes" sx = {{ my : 1 }} select
                    {...registro('background', { required: true })}
                    defaultValue=''
                  >
                    {yesno.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </form>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs = {2} textAlign = "center" >
          <Typography>
            {`Puntaje: ${estimation.prediction} Severidad: ${estimation.severity}`} 
          </Typography>
        </Grid>
      </Grid>
      <CardContent>
        <Button variant='contained' onClick={getInfoPatientSubmit(onSubmit)} >Generar estimación</Button>
      </CardContent>
    </Card>
  );
}