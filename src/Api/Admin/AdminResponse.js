import axios from 'axios'

import { useEnv } from '../../Context/EnvContext'
// import { DecypherData } from '../Decypher/DecypherData'

export const useExternalApi = () => {
  const { apiServerUrl } = useEnv()

  const makeRequest = async (options) => {
    try {
      const response = await axios(options.config)
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response
      }
      return error.message
    }
  }

  const getAdmin = async (setResponse, token) => {
    const config = {
      url: `${apiServerUrl}/api/admin/get`,
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const updateAdmin = async (datos, setResponse, token) => {
    const config = {
      url: `${apiServerUrl}/api/admin/update/self`,
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`
      },
      data: datos
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const getAllMedics = async (setResponse, token) => {
    const config = {
      url: `${apiServerUrl}/api/medic/get/all`,
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    }

    const response = await makeRequest({ config })

    const responseAsArray = response.data.map((item) => {
      return [
        item.user_id.id,
        item.id_type,
        item.id,
        item.first_name,
        item.last_name,
        item.city,
        item.cellphone,
        item.user_id.email,
        item.user_id.is_active
      ]
    })

    setResponse(responseAsArray)
  }

  const getAllPatients = async (setResponse, token) => {
    const config = {
      url: `${apiServerUrl}/api/patient/get/all`,
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    }

    const response = await makeRequest({ config })

    const responseAsArray = response.data.map((item) => {
      return [
        item.patient.patient_id,
        item.patient.first_name,
        item.patient.last_name,
        item.patient.city,
        item.patient.address,
        item.patient.cellphone,
        item.patient.blood_type,
        item.patient.birth_date,
        item.patient.actual_estimation,
        item.user.first_name.concat(' ', item.user.last_name)
      ]
    })

    setResponse(responseAsArray)
  }

  return {
    getAdmin,
    updateAdmin,
    getAllMedics,
    getAllPatients
  }
}
