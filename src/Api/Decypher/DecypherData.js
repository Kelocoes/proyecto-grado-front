import CryptoJS from 'crypto-js'

export const DecypherData = (cypherData, aesIv, aesSecretKey) => {
  const iv = CryptoJS.enc.Utf8.parse(aesIv)
  const key = CryptoJS.enc.Utf8.parse(aesSecretKey)

  let decrypted = CryptoJS.AES.decrypt(cypherData.ciphertext, key, { iv, mode: CryptoJS.mode.CBC })
  decrypted = decrypted.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decrypted)
}
