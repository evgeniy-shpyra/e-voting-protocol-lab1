const BigInteger = require("big-integer")

const generateSignature = (messageHash, privateKey) => {

    const result = BigInteger(messageHash).modPow(
        BigInteger(privateKey.D),
        BigInteger(privateKey.N)
    )
    return result.toString()
}

const verifySignature = (messageHash, signature, publicKey) => {
    let computedHash = BigInteger(signature).modPow(
        BigInteger(publicKey.E),
        BigInteger(publicKey.N)
    )

    // console.log("computedHash", computedHash.toString())
    // console.log("messageHash", messageHash)
    
    return computedHash.toString() == messageHash
    // return true
}

module.exports = {
    generateSignature,
    verifySignature,
}
