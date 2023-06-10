import CryptoJS from 'crypto-js';

export const DecypherData = (cypherData, aesIv, aesSecretKey ) => {

    var iv = CryptoJS.enc.Utf8.parse(aesIv);
    var key = CryptoJS.enc.Utf8.parse(aesSecretKey);

    var decrypted =  CryptoJS.AES.decrypt(cypherData.ciphertext, key, { iv: iv, mode: CryptoJS.mode.CBC});
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted)
}