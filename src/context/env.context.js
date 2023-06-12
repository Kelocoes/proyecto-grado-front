import React from 'react'

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL
const aesIv = process.env.REACT_APP_AES_IV
const aesSecretKey = process.env.REACT_APP_AES_SECRET_KEY

const isEnvValid = apiServerUrl && aesIv && aesSecretKey

if (!isEnvValid) {
  throw new Error('Missing environment variables.')
}

const dotenv = {
  apiServerUrl,
  aesIv,
  aesSecretKey
}

export const EnvContext = React.createContext(dotenv)

export const useEnv = () => {
  const context = React.useContext(EnvContext)
  if (!context) {
    throw new Error('useEnv must be used within a EnvProvider')
  }
  return context
}
