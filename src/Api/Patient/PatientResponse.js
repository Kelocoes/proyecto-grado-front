import axios from 'axios'

import { useEnv } from '../../Context/EnvContext'
import { DecypherData } from '../Cypher&Decypher/DecypherData'

export const useExternalApi = () => {
  const { apiServerUrl, aesIv, aesSecretKey } = useEnv()

  const makeRequest = async (options) => {
    try {
      const response = await axios(options.config)
      const decryptedResponseBody = DecypherData(response.data, aesIv, aesSecretKey)
      response.data = decryptedResponseBody
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response
      }
      return error.message
    }
  }

  const createPatient = async (datos, setResponse, token) => {
    const config = {
      url: `${apiServerUrl}/api/patient/create`,
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`
      },
      data: datos
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const deletePatient = async (id, token, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/patient/delete`,
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`
      },
      data: {
        patient_id: id
      }
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const getAllPatients = async (setResponse, token, type) => {
    const config = {
      url: `${apiServerUrl}/api/patient/get/all`,
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    }

    const response = await makeRequest({ config })

    let responseAsArray = []
    if (type === 'Admin') {
      responseAsArray = response.data.results.map((item) => {
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
    } else {
      responseAsArray = response.data.results.map((item) => {
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
    }

    setResponse({
      status: response.status,
      responseAsArray,
      data: { detail: response.data.detail }
    })
  }

  const updatePatient = async (data, token, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/patient/update`,
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`
      },
      data: {
        patient_id: data[0],
        first_name: data[1],
        last_name: data[2],
        city: data[3],
        address: data[4],
        cellphone: data[5],
        blood_type: data[6],
        birth_date: data[7]
      }
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  return {
    createPatient,
    deletePatient,
    getAllPatients,
    updatePatient
  }
}
