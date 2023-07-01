import CryptoJS from 'crypto-js'

export const CypherData = (data, aesIv, aesSecretKey) => {
  const iv = CryptoJS.enc.Utf8.parse(aesIv)
  const key = CryptoJS.enc.Utf8.parse(aesSecretKey)

  let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, keySize: 256 })
  encrypted = encrypted.toString()
  return { ciphertext: encrypted }
}
