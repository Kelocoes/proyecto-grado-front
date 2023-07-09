import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import CachedIcon from '@mui/icons-material/Cached'
import CircularProgress from '@mui/material/CircularProgress'

function CustomToolBarRender (isLoading, setIsLoading, setIsOpenRegister,
  reloadInfo, setReloadInfo) {
  return (
    <>
      <IconButton
        color="success"
        onClick={() => setIsOpenRegister(true)}
      >
        <AddCircleOutlinedIcon />
      </IconButton>
      {isLoading
        ? <IconButton> <CircularProgress color="success" size={20} /> </IconButton>
        : <IconButton color="success"
          onClick={() => {
            setReloadInfo(!reloadInfo)
            setIsLoading(true)
          }}
        >
          <CachedIcon />
        </IconButton>
      }
    </>
  )
}

export default function EstimationManagement (props) {
  const {
    response,
    title,
    reloadInfo,
    setReloadInfo,
    setIsOpenRegister
  } = props

  const [isLoading, setIsLoading] = useState(false)

  const columns = [
    'Id', 'Documento', 'Paciente', 'Documento Doctor', 'Fecha',
    'Edad', 'Sexo', 'Peso', 'Altura', 'Diabetes', 'Sistólica',
    'Diastólica', 'Colesterol', 'HDL', 'LDL', 'Triglicéridos', 'Fumador',
    'Antecedentes', 'Estimación', 'Severidad']

  const options = {
    selectableRows: 'none',
    rowsPerPage: 5,
    rowsPerPageOptions: [5],
    customToolbar: () => (
      CustomToolBarRender(isLoading, setIsLoading, setIsOpenRegister, reloadInfo, setReloadInfo)
    )
  }

  useEffect(() => {
    setIsLoading(false)
  }, [response])

  return (
    <Box
      sx={{
        maxWidth: '1500px'
      }}
    >
      <MUIDataTable
        title={title}
        data={response}
        columns={columns}
        options={options}
      />
    </Box>
  )
}
