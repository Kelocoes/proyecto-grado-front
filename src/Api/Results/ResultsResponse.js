import axios from 'axios'

import { useEnv } from '../../Context/EnvContext'
import { DecypherData } from '../Cypher&Decypher/DecypherData'

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
        return error.response.data
      }

      return error.message
    }
  }

  const getEstimation = async (datos, setEstimation, setActiveButtonGraph) => {
    const config = {
      url: `${apiServerUrl}/api/results/model/generate`,
      method: 'POST',
      headers: {
      },
      data: {
        registered: false,
        patient_id: '0',
        sex: datos.sex,
        diabetes: datos.diabetes,
        smoking: datos.smoking,
        background: datos.background,
        age: parseInt(datos.age),
        weight: datos.weight,
        height: datos.height,
        systolic: datos.systolic,
        diastolic: datos.diastolic,
        cholesterol: datos.cholesterol,
        hdl: datos.hdl,
        ldl: datos.ldl,
        triglycerides: datos.triglycerides
      }
    }

    const response = await makeRequest({ config })
    setEstimation(response)
    setActiveButtonGraph(true)
  }

  return {
    getEstimation
  }
}
