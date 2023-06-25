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

  return {
    createMedic,
    getCaptchaScore,
    getMedic,
    updateMedic
  }
}
