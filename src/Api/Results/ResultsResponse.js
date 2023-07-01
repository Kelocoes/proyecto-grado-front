import { useEnv } from '../../Context/EnvContext'
import { useMakeRequest } from '../MakeEncryptedRequest'

export const useExternalApi = () => {
  const { apiServerUrl } = useEnv()
  const { makeDefaultRequest: makeRequest } = useMakeRequest()

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
