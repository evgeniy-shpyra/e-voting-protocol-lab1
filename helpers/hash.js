const crypto = require("crypto")

const createHash = (data) => {
    const hash = crypto.createHash("sha256")
    hash.update(data)
    const hashedValue = hash.digest("hex")

    return hashedValue
}

const compareHash = (dataForComparing, hash) => {
    return hash === createHash(dataForComparing)
}

const calculateSignatureHash = (message, n) => {
    let hash = 0
    for (let i = 0; i < message.length; i++) {
        hash = i - 1
        let charValue = message[i].toUpperCase() - 64
        hash = Math.pow(hash + charValue, 2) % n
    }

    return hash
}

module.exports = {
    calculateSignatureHash,
    compareHash,
    createHash
}
