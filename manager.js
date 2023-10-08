const fs = require("fs")
const { calculateSignatureHash } = require("./helpers/hash")
const { generateSignature, verifySignature } = require("./helpers/RSASignature")

const resultsPath = "data/results.json"

const getResults = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(resultsPath, "utf8", (err, data) => {
            if (err) {
                console.error("Помилка читання файлу:", err)
                return
            }
            const jsonData = JSON.parse(data)
            resolve(jsonData)
        })
    })
}

const generateVoterSignature = (voter, publicKey, privateKey) => {
    // Створення е-підпису
    const hashMassage = calculateSignatureHash(voter.name, publicKey.N)
    return generateSignature(hashMassage, privateKey)
}

const verifyVoterSignature = (voter, publicKey, signature) => {
    //  Перевірка е-підпису
    const hashMassage = calculateSignatureHash(voter.name, publicKey.N)
    return verifySignature(hashMassage, signature, publicKey)
}

const recordVote = async ({
    voter,
    signature,
    encryptedCandidate,
    publicKey,
}) => {
    if (!verifyVoterSignature(voter, publicKey, signature)) {
        console.log("Signature is invalid")
    }

    const data = await fs.readFileSync(resultsPath, "utf8")

    const addResults = JSON.parse(data)

    addResults.voters.push({
        candidateId: encryptedCandidate,
        voterId: voter.id,
    })

    const addResultsJson = JSON.stringify(addResults, null, 2)
  
    await fs.writeFileSync(resultsPath, addResultsJson, "utf8")
  
}

module.exports = { getResults, generateVoterSignature, recordVote }
