import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import MUIDataTable from 'mui-datatables'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Switch from '@mui/material/Switch'
import Fade from '@mui/material/Fade'

function CustomCell (value, tableMeta, updateValue) {
  return (<FormControlLabel
    label=""
    value={value}
    control={<TextField
      label=""
      type="number"
      variant="standard"
      InputProps={{
        disableUnderline: true,
        maxLength: 30
      }}
      sx={{ width: '15ch' }}
    />
    }
    onChange={event => updateValue(event.target.value)}
  />)
}

export default function TablePacientes (props) {
  const { response, type } = props
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

  const [isCleaned, setIsCleaned] = useState(false)
  const [columns, setColumns] = useState([
    {
      name: 'Tipo',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              select
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              label=""
            >
              {typeId.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>))}
            </TextField>
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Documento',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          CustomCell(value, tableMeta, updateValue)
        )
      }
    },
    {
      name: 'Nombre',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true,
                maxLength: 25
              }}
              sx={{ width: '15ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Apellido',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true,
                maxLength: 40
              }}
              sx={{ width: '15ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Ciudad',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true,
                maxLength: 30
              }}
              sx={{ width: '10ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Direccion',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true,
                maxLength: 30
              }}
              sx={{ width: '10ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Teléfono',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              type="number"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                maxLength: 15
              }}
              sx={{ width: '15ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Sangre',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              select
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              label=""
              sx={{ width: '7ch' }}
            >
              {bloodTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>))}
            </TextField>
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Correo',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true,
                readOnly: true
              }}
              sx={{ width: '30ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Activo',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Switch defaultChecked={value} />
        )
      }
    },
    {
      name: 'Nacimiento',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              variant="standard"
              InputProps={{
                disableUnderline: true
              }}
              type="date"
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: 'Estimación',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <FormControlLabel
            label=""
            value={value}
            control={<TextField
              label=""
              type="number"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                readOnly: true,
                maxLength: 30
              }}
              sx={{ width: '10ch' }}
            />
            }
            onChange={event => updateValue(event.target.value)}
          />
        )
      }
    },
    {
      name: '',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <IconButton onClick={() => console.log(tableMeta.rowData)}>
            <BorderColorIcon />
          </IconButton>
        )
      }
    }])

  const options = {
    selectableRows: 'none'
  }

  useEffect(() => {
    let excludeList = []
    if (type === 'Medicos') {
      excludeList = ['Nacimiento', 'Direccion', 'Sangre', 'Estimación']
    } else {
      excludeList = ['Tipo', 'Correo', 'Activo']
    }
    setColumns(columns.filter(item => !excludeList.includes(item.name)))
    setIsCleaned(true)
  }, [])

  if (!isCleaned) {
    return (<div />)
  }

  return (
    <Fade in={true}>
      <Box
        sx={{
          maxWidth: '1500px',
          marginTop: '5%',
          marginX: '10%'
        }}
      >
        <MUIDataTable
          title={`Lista de ${type}`}
          data={response.responseAsArray}
          columns={columns}
          options={options}
        />
      </Box>
    </Fade>
  )
}
