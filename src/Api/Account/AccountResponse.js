import { useEnv } from '../../Context/EnvContext'
import { CypherData } from '../Cypher&Decypher/CypherData'
import { useMakeRequest } from '../MakeEncryptedRequest'

export const useExternalApi = () => {
  const { apiServerUrl, aesIv, aesSecretKey } = useEnv()
  const { makeEncryptedRequest: makeRequest } = useMakeRequest()

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
