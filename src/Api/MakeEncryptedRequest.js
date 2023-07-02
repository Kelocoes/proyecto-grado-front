import axios from 'axios'

import { useEnv } from '../Context/EnvContext'

import { DecypherData } from './Cypher&Decypher/DecypherData'

export const useMakeRequest = () => {
  const { aesIv, aesSecretKey } = useEnv()

  const makeEncryptedRequest = async (options) => {
    try {
      const response = await axios(options.config)
      const decryptedResponseBody = DecypherData(response.data, aesIv, aesSecretKey)
      response.data = decryptedResponseBody
      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const decryptedResponseBody = DecypherData(error.response.data, aesIv, aesSecretKey)
        error.response.data = decryptedResponseBody
        return error.response
      }
      return error.message
    }
  }

  const makeDefaultRequest = async (options) => {
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

  return {
    makeEncryptedRequest,
    makeDefaultRequest
  }
}
