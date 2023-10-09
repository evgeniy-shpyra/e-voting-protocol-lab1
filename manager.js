const fs = require("fs")
const { calculateSignatureHash } = require("./helpers/hash")
const { generateSignature, verifySignature } = require("./helpers/RSASignature")
const { candidatesData } = require("./data/candidates")
const { votersData } = require("./data/voters")
const { decryptWithGamma } = require("./helpers/gammaEncrypting")

const resultsPath = "data/results.json"

const getResults = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(resultsPath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err)
                return
            }
            const jsonData = JSON.parse(data)
            resolve(jsonData)
        })
    })
}

const seeResultAndDecrypt = async (keyForDecryption) => {
    const encryptedResults = await getResults()

    let results = []

    encryptedResults.ballots.forEach((ballot) => {
        const candidateId = decryptWithGamma(
            ballot.candidateId,
            keyForDecryption
        )
        let foundCandidate = candidatesData.find(
            (item) => item.id === candidateId
        )
        if (foundCandidate)
            results.push({
                candidate: decryptWithGamma(
                    ballot.candidateId,
                    keyForDecryption
                ),
                voter: votersData.find((item) => item.id === ballot.voterId)
                    .name,
            })
    })

    if(!results.length){
        console.log('Не має бюлетнів')
        return
    }
    results.forEach(result => {
        console.log(`${result.voter} за ${candidatesData.find(candidate => candidate.id === result.candidate).name}`)
    })

    console.log('\n')

    candidatesData.forEach(candidate => {
        console.log(`${candidate.name}: ${results.filter(result => result.candidate ===  candidate.id).length}`)
    })

    // Додати вихід в меню 
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
        return false
    }

    const data = await fs.readFileSync(resultsPath, "utf8")

    const addResults = JSON.parse(data)

    addResults.ballots.push({
        candidateId: encryptedCandidate,
        voterId: voter.id,
    })

    const addResultsJson = JSON.stringify(addResults, null, 2)

    await fs.writeFileSync(resultsPath, addResultsJson, "utf8")

    return true
}

module.exports = {
    getResults,
    generateVoterSignature,
    recordVote,
    seeResultAndDecrypt,
}
