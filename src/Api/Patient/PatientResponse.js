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
    console.log(response)
    setResponse(response)
  }

  return {
    createPatient
  }
}
