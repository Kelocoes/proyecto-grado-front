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

  const getInfoAccount = async (token) => {
    const config = {
      url: `${apiServerUrl}/api/account/isActive`,
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    }

    const response = await makeRequest({ config })
    return response
  }

  return {
    getInfoAccount
  }
}
