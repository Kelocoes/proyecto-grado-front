import { useEnv } from '../../Context/EnvContext'
import { CypherData } from '../Cypher&Decypher/CypherData'
import { useMakeRequest } from '../MakeEncryptedRequest'

export const useExternalApi = () => {
  const { apiServerUrl, aesIv, aesSecretKey } = useEnv()
  const { makeEncryptedRequest: makeRequest } = useMakeRequest()

  const createPatient = async (datos, setResponse, token) => {
    const config = {
      url: `${apiServerUrl}/api/patient/create`,
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`
      },
      data: CypherData(datos, aesIv, aesSecretKey)
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const deletePatient = async (id, token, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/patient/delete`,
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`
      },
      data: CypherData({
        patient_id: id
      }, aesIv, aesSecretKey)
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  const getAllPatients = async (setResponse, token, type) => {
    const config = {
      url: `${apiServerUrl}/api/patient/get/all`,
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`
      }
    }

    const response = await makeRequest({ config })
    let responseAsArray = []
    if (type === 'Admin') {
      responseAsArray = response.data.results.map((item) => {
        return [
          item.patient.patient_id,
          item.patient.first_name,
          item.patient.last_name,
          item.patient.city,
          item.patient.address,
          item.patient.cellphone,
          item.patient.blood_type,
          item.patient.birth_date,
          item.patient.actual_estimation,
          item.patient.outcome,
          item.user.first_name.concat(' ', item.user.last_name)
        ]
      })
    } else {
      responseAsArray = response.data.results.map((item) => {
        return [
          item.patient_id,
          item.first_name,
          item.last_name,
          item.city,
          item.address,
          item.cellphone,
          item.blood_type,
          item.birth_date,
          item.actual_estimation,
          item.outcome
        ]
      })
    }

    setResponse({
      status: response.status,
      responseAsArray,
      data: { detail: response.data.detail }
    })
  }

  const updatePatient = async (data, token, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/patient/update`,
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`
      },
      data: CypherData({
        patient_id: data[0],
        first_name: data[1],
        last_name: data[2],
        city: data[3],
        address: data[4],
        cellphone: data[5],
        blood_type: data[6],
        birth_date: data[7],
        outcome: data[9]
      }, aesIv, aesSecretKey)
    }

    const response = await makeRequest({ config })
    setResponse(response)
  }

  return {
    createPatient,
    deletePatient,
    getAllPatients,
    updatePatient
  }
}
