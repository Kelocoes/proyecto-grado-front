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

  const updateMedicAsOther = async (data, token, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/admin/update/other`,
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`
      },
      data: {
        user_id: data[0].toString(),
        id_type: data[1],
        id: data[2],
        first_name: data[3],
        last_name: data[4],
        city: data[5],
        cellphone: data[6]
      }
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
