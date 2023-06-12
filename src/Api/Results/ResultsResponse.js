import axios from 'axios'

import { useEnv } from '../../context/env.context'
import { DecypherData } from '../Decypher/DecypherData'

export const useExternalApi = () => {
  const { apiServerUrl, aesIv, aesSecretKey } = useEnv()

  const makeRequest = async (options) => {
    try {
      const response = await axios(options.config)
      const { data } = response

      return data
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

    const cypherData = await makeRequest({ config })
    const data = DecypherData(cypherData, aesIv, aesSecretKey)
    setEstimation(data)
    setActiveButtonGraph(true)
  }

  return {
    getEstimation
  }
}
