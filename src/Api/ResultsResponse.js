import axios from 'axios'
import { useEnv } from '../context/env.context'

export const useExternalApi = () => {

    const { apiServerUrl } = useEnv()

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

    const getEstimation = async (datos, setEstimation) => {

        const config = {
            url: `${apiServerUrl}/api/results/model/generate`,
            method: 'POST',
            headers: {},
            data: {
                "registered": false,
                "user_id": "0",
                "patient_id": "0",
                "sex": datos["sex"],
                "diabetes": datos["diabetes"],
                "smoking": datos["smoking"],
                "background": datos["background"],
                "age" : datos["age"],
                "weight": datos["weight"],
                "height": datos["height"],
                "systolic": datos["systolic"],
                "diastolic": datos["diastolic"],
                "cholesterol": datos["cholesterol"],
                "hdl": datos["hdl"],
                "ldl": datos["ldl"],
                "triglycerides": datos["triglycerides"]
            }
        }

        const data = await makeRequest({config})
        
        setEstimation(data)
    }

    return {
        getEstimation
    }
}