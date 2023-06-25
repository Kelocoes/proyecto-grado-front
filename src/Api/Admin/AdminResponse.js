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

  return {
    getAdmin,
    updateAdmin
  }
}
