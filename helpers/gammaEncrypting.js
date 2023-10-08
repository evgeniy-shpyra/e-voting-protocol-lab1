function encryptWithGamma(data, gamma) {
    let encryptedData = ""
    for (let i = 0; i < data.length; i++) {
        const charCodeData = data.charCodeAt(i)
        const charCodeGamma = gamma.charCodeAt(i % gamma.length)
        const encryptedCharCode = charCodeData ^ charCodeGamma
        encryptedData += String.fromCharCode(encryptedCharCode)
    }
    return encryptedData
}

function decryptWithGamma(encryptedData, gamma) {
    let decryptedData = ""
    for (let i = 0; i < encryptedData.length; i++) {
        const charCodeEncryptedData = encryptedData.charCodeAt(i)
        const charCodeGamma = gamma.charCodeAt(i % gamma.length)
        const decryptedCharCode = charCodeEncryptedData ^ charCodeGamma
        decryptedData += String.fromCharCode(decryptedCharCode)
    }
    return decryptedData
}

module.exports = {
    decryptWithGamma,
    encryptWithGamma,
}
