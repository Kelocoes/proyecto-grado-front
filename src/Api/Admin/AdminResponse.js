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

    console.log(responseAsArray)
    setResponse({ response, responseAsArray })
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
        item.patient_id,
        item.first_name,
        item.last_name,
        item.city,
        item.address,
        item.cellphone,
        item.blood_type,
        item.birth_date,
        item.actual_estimation
      ]
    })

    console.log(responseAsArray)
    setResponse({ response, responseAsArray })
  }

  return {
    getAdmin,
    updateAdmin,
    getAllMedics,
    getAllPatients
  }
}
