import axios from 'axios'

import { useEnv } from '../../context/env.context'
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

  return {
    createMedic,
    getCaptchaScore
  }
}
