import { useEnv } from '../../Context/EnvContext'
import { CypherData } from '../Cypher&Decypher/CypherData'
import { useMakeRequest } from '../MakeEncryptedRequest'

export const useExternalApi = () => {
  const { apiServerUrl, aesIv, aesSecretKey } = useEnv()
  const { makeEncryptedRequest: makeRequest } = useMakeRequest()

  const createMedic = async (datos, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/medic/create`,
      method: 'POST',
      headers: {
      },
      data: CypherData(datos, aesIv, aesSecretKey)
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
      data: CypherData({ token }, aesIv, aesSecretKey)
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
      data: CypherData(datos, aesIv, aesSecretKey)
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
