import axios from 'axios'

import { useEnv } from '../../Context/EnvContext'
import { DecypherData } from '../Cypher&Decypher/DecypherData'
import { CypherData } from '../Cypher&Decypher/CypherData'

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
        const decryptedResponseBody = DecypherData(error.response.data, aesIv, aesSecretKey)
        error.response.data = decryptedResponseBody
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
      data: CypherData(datos, aesIv, aesSecretKey)
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const updateMedicAsOther = async (data, token, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/admin/update/other`,
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`
      },
      data: CypherData({
        user_id: data[0].toString(),
        id_type: data[1],
        id: data[2],
        first_name: data[3],
        last_name: data[4],
        city: data[5],
        cellphone: data[6]
      }, aesIv, aesSecretKey)
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  return {
    getAdmin,
    updateAdmin,
    updateMedicAsOther
  }
}
