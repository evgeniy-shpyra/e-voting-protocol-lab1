const crypto = require("crypto")
const fs = require("fs")
const bigintModArith = require('bigint-mod-arith');

function euclideanAlgorithm(originalA, originalB) {
    const a = Math.abs(originalA)
    const b = Math.abs(originalB)

    return b === 0 ? a : euclideanAlgorithm(b, a % b)
}

const generateKeyPair = () => {
    const p = 61
    const q = 53

    const n = p * q

    const phi = (p - 1) * (q - 1)

    let e
    do {
        e = Math.floor(Math.random() * (phi - 2)) + 2
    } while (euclideanAlgorithm(e, phi) !== 1)

    // Модуль оберненого
    let d = bigintModArith.modInv(BigInt(e), BigInt(phi));
    
    const publicKey = {
        E: e,
        N: n,
    }

    const privateKey = {
        D: d,
        N: n,
    }

    return {
        publicKey,
        privateKey,
    }
}

module.exports = {
    generateKeyPair,
}
