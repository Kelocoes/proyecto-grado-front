import { useEnv } from '../../Context/EnvContext'
import { CypherData } from '../Cypher&Decypher/CypherData'
import { useMakeRequest } from '../MakeEncryptedRequest'

export const useExternalApi = () => {
  const { apiServerUrl, aesIv, aesSecretKey } = useEnv()
  const { makeDefaultRequest, makeEncryptedRequest } = useMakeRequest()

  const getEstimation = async (datos, setEstimation, setActiveButtonGraph, register, token) => {
    const config = {
      url: `${apiServerUrl}/api/results/model/generate`,
      method: 'POST',
      headers: {
        ...(register && { Authorization: `Token ${token}` })
      },
      data: {
        registered: register,
        patient_id: datos.patient_id ? datos.patient_id : '0',
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

    const response = await makeDefaultRequest({ config })
    setEstimation(response)
    setActiveButtonGraph(true)
  }

  const getEstimationByPatient = async (id, token, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/results/get/byPatient`,
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`
      },
      data: CypherData({
        patient_id: id
      }, aesIv, aesSecretKey)
    }

    const response = await makeEncryptedRequest({ config })

    const responseAsArray = response.data.results.map((item) => {
      return [
        item.result.result_id,
        item.patient.patient_id,
        item.patient.first_name,
        item.user.id,
        item.result.date,
        item.result.age,
        item.result.sex === '1' ? 'Femenino' : 'Masculino',
        item.result.weight,
        item.result.height,
        item.result.diabetes === '1' ? 'Si' : 'No',
        item.result.systolic,
        item.result.diastolic,
        item.result.cholesterol,
        item.result.hdl,
        item.result.ldl,
        item.result.triglycerides,
        item.result.smoking === '1' ? 'Si' : 'No',
        item.result.background === '1' ? 'Si' : 'No',
        item.result.estimation.toFixed(4),
        item.result.severity
      ]
    })

    setResponse({
      status: response.status,
      responseAsArray,
      data: { detail: response.data.detail }
    })
  }

  return {
    getEstimation,
    getEstimationByPatient
  }
}
