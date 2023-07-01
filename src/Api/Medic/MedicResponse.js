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

  const createMedic = async (datos, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/medic/create`,
      method: 'POST',
      headers: {
      },
      data: datos
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const getCaptchaScore = async (token, setCaptchaResponse) => {
    const config = {
      url: `${apiServerUrl}/api/captcha/getResponse`,
      method: 'post',
      headers: {
      },
      data: {
        token
      }
    }

    const response = await makeRequest({ config })
    setCaptchaResponse(response)
  }

  const getMedic = async (setResponse, token) => {
    const config = {
      url: `${apiServerUrl}/api/medic/get`,
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const updateMedic = async (datos, setResponse, token) => {
    const config = {
      url: `${apiServerUrl}/api/medic/update/self`,
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

    const responseAsArray = response.data.results.map((item) => {
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

    setResponse({
      status: response.status,
      responseAsArray,
      data: { detail: response.data.detail }
    })
  }

  return {
    createMedic,
    getCaptchaScore,
    getMedic,
    updateMedic,
    getAllMedics
  }
}
