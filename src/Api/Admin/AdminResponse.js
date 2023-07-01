import { useEnv } from '../../Context/EnvContext'
import { CypherData } from '../Cypher&Decypher/CypherData'
import { useMakeRequest } from '../MakeEncryptedRequest'

export const useExternalApi = () => {
  const { apiServerUrl, aesIv, aesSecretKey } = useEnv()
  const { makeEncryptedRequest: makeRequest } = useMakeRequest()

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
