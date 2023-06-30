import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import Switch from '@mui/material/Switch'
import CancelIcon from '@mui/icons-material/Cancel'
import Box from '@mui/material/Box'

function CustomCell (value, tableMeta, updateValue, type, width, maxLength) {
  return (<FormControlLabel
    label=""
    value={value}
    control={<TextField
      label=""
      type={type}
      variant="outlined"
      InputProps={{
        maxLength
      }}
      sx={{ width: { width } }}
    />
    }
    onChange={event => updateValue(event.target.value)}
  />)
}

function CustomItemCell (value, tableMeta, updateValue, type) {
  const typeId = [{ value: 'CC', label: 'CC' }, { value: 'CE', label: 'CE' }]
  const bloodTypes = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }]
  const mainList = type === 'typeId' ? typeId : bloodTypes

  return (
    <FormControlLabel
      label=""
      value={value}
      control={<TextField
        select
        variant="outlined"
        label=""
      >
        {mainList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>))}
      </TextField>
      }
      onChange={event => updateValue(event.target.value)}
    />
  )
}

function CustomDeleteCell (value, tableMeta, updateValue, response, setResponse) {
  return (
    <IconButton
      aria-label="delete"
      size="large"
      onClick={() => {
        console.log('Quiero borrarme', tableMeta.rowData)
        const updatedData = [...response]
        updatedData.splice(tableMeta.rowIndex, 1)
        setResponse(updatedData)
      }
      }
    >
      <CancelIcon color="error" />
    </IconButton>
  )
}

function CustomSwitchCell (value, tableMeta, updateValue) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Switch
        checked={value}
        onChange={event => {
          updateValue(event.target.value !== 'true')
          console.log('Quiero cambiarme a ', !value)
          console.log(tableMeta.rowData)
        }}
      />
      }
    />
  )
}

function CustomUpdateCell (value, tableMeta, updateValue) {
  return (
    <IconButton onClick={() => console.log('Quiero actualizarme ', tableMeta.rowData)}>
      <SyncAltIcon />
    </IconButton>
  )
}

export default function ManagementTable (props) {
  const { response, setResponse, title, includeList } = props

  const [isCleaned, setIsCleaned] = useState(false)
  const [columns, setColumns] = useState([
    {
      name: 'key',
      options: {
        display: false,
        filter: false
      }
    },
    {
      name: 'Tipo',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomItemCell(value, tableMeta, updateValue, 'typeId')
        )
      }
    },
    {
      name: 'Documento',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue, 'number', '18ch', 20)
        )
      }
    },
    {
      name: 'Nombre',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue, 'string', '15ch', 50)
        )
      }
    },
    {
      name: 'Apellido',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue, 'string', '15ch', 100)
        )
      }
    },
    {
      name: 'Ciudad',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue, 'string', '15ch', 50)
        )
      }
    },
    {
      name: 'Dirección',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue, 'string', '15ch', 200)
        )
      }
    },
    {
      name: 'Teléfono',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue, 'number', '17ch', 20)
        )
      }
    },
    {
      name: 'Sangre',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomItemCell(value, tableMeta, updateValue, 'blood')
        )
      }
    },
    {
      name: 'Correo',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue, 'string', '30ch', 254)
        )
      }
    },
    {
      name: 'Nacimiento',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue, 'date', '18ch')
        )
      }
    },
    {
      name: 'Estimación',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue, 'number', '15ch')
        )
      }
    },
    {
      name: 'Médico'
    },
    {
      name: 'Eliminar',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomDeleteCell(value, tableMeta, updateValue, response, setResponse)
        )
      }
    },
    {
      name: 'Activo',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomSwitchCell(value, tableMeta, updateValue)
        )
      }
    },
    {
      name: 'Actualizar',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomUpdateCell(value, tableMeta, updateValue)
        )
      }
    }])

  const options = {
    selectableRows: 'none',
    rowsPerPage: 5,
    rowsPerPageOptions: [5]
  }

  useEffect(() => {
    setColumns(columns.filter(item => includeList.includes(item.name)))
    setIsCleaned(true)
  }, [])

  return (
    <Box
      sx={{
        maxWidth: '1500px'
      }}
    >
      {!isCleaned && <div /> }
      {isCleaned &&
        <MUIDataTable
          title={title}
          data={response}
          columns={columns}
          options={options}
        />
      }
    </Box>
  )
}
