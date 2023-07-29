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
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import CachedIcon from '@mui/icons-material/Cached'
import CircularProgress from '@mui/material/CircularProgress'

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
  const outcome = [{ value: '0', label: 'No' }, { value: '1', label: 'Si' }]
  const bloodTypes = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }]

  let mainList = []
  switch (type) {
    case 'typeId':
      mainList = typeId
      break
    case 'outcome':
      mainList = outcome
      break
    case 'blood':
      mainList = bloodTypes
      break
  }

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

function CustomDeleteCell (value, tableMeta, updateValue, deleteFunction) {
  return (
    <IconButton
      aria-label="delete"
      size="large"
      onClick={async () => {
        await deleteFunction(tableMeta.rowData[0])
      }
      }
    >
      <CancelIcon color="error" />
    </IconButton>
  )
}

function CustomSwitchCell (value, tableMeta, updateValue, activateFunction) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Switch
        checked={value}
        onChange={event => {
          updateValue(event.target.value !== 'true')
          activateFunction(tableMeta.rowData[0], event.target.value)
        }}
      />
      }
    />
  )
}

function CustomUpdateCell (value, tableMeta, updateValue, updateFunction) {
  return (
    <IconButton
      onClick={() => {
        updateFunction(tableMeta.rowData)
      }
    }
    >
      <SyncAltIcon />
    </IconButton>
  )
}

function CustomToolBarRender (isLoading, setIsLoading, setIsOpenRegister,
  reloadInfo, setReloadInfo) {
  return (
    <React.Fragment>
      <IconButton color="success" onClick={() => setIsOpenRegister(true)}>
        <AddCircleOutlinedIcon />
      </IconButton>
      {isLoading
        ? <IconButton> <CircularProgress color="success" size={20} /> </IconButton>
        : <IconButton color="success"
          onClick={() => {
            setIsLoading(true)
            setReloadInfo(!reloadInfo)
          }}
        >
          <CachedIcon />
        </IconButton>
      }
    </React.Fragment>
  )
}

export default function ManagementTable (props) {
  const {
    response,
    title,
    includeList,
    setIsOpenRegister,
    reloadInfo,
    setReloadInfo,
    deleteFunction,
    updateFunction,
    activateFunction
  } = props

  const [isCleaned, setIsCleaned] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
      name: 'Correo'
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
      name: 'Estimación'
    },
    {
      name: 'Descenlace',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomItemCell(value, tableMeta, updateValue, 'outcome')
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
          CustomDeleteCell(value, tableMeta, updateValue, deleteFunction)
        )
      }
    },
    {
      name: 'Activo',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomSwitchCell(value, tableMeta, updateValue, activateFunction)
        )
      }
    },
    {
      name: 'Actualizar',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomUpdateCell(value, tableMeta, updateValue, updateFunction)
        )
      }
    }])

  const options = {
    selectableRows: 'none',
    rowsPerPage: 5,
    rowsPerPageOptions: [5],
    customToolbar: () => (
      CustomToolBarRender(isLoading, setIsLoading, setIsOpenRegister, reloadInfo, setReloadInfo)
    )
  }

  useEffect(() => {
    setColumns(columns.filter(item => includeList.includes(item.name)))
    setIsCleaned(true)
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [response])

  return (
    <Box
      sx={{
        maxWidth: '1500px'
      }}
    >
      {!isCleaned && <div />}
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
