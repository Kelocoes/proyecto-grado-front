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

  const checkPassword = async (datos, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/account/checkpassword`,
      method: 'POST',
      headers: {
      },
      data: CypherData({
        username: datos.username,
        password: datos.password
      }, aesIv, aesSecretKey)
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const sendEmailPassword = async (datos, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/account/sendemailpassword`,
      method: 'POST',
      headers: {
      },
      data: CypherData({
        username: datos.username
      }, aesIv, aesSecretKey)
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const changePassword = async (datos, token, secret, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/account/changepassword`,
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`
      },
      data: CypherData({
        password: datos.password,
        secret
      }, aesIv, aesSecretKey)
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const changeStatus = async (id, value, token, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/account/update/status`,
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`
      },
      data: CypherData({
        id,
        is_active: value
      }, aesIv, aesSecretKey)
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  return {
    getInfoAccount,
    checkPassword,
    sendEmailPassword,
    changePassword,
    changeStatus
  }
}
