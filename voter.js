const readline = require("readline")
const { getResults, generateVoterSignature, recordVote } = require("./manager")
const { createMenu, simpleRead } = require("./helpers/ui")
const { votersData } = require("./data/voters")
const { generateKeyPair } = require("./helpers/generateKeys")
const { candidatesData } = require("./data/candidates")
const { compareHash, createHash } = require("./helpers/hash")
const { encryptWithGamma } = require("./helpers/gammaEncrypting")

const globalData = {
    privateKey: null,
    publicKey: null,
    voter: null,
}

const voterHasVoted = async (voter) => {
    const result = await getResults()

    const foundVotedVote = result.ballots.find((item) => item.voterId === voter.id)
    if (!voter.canVote) {
        return {
            canVote: false,
            massage: "You can't vote",
        }
    }

    if (foundVotedVote) {
        return {
            canVote: false,
            massage: "The smartest, exhale, you have already voted",
        }
    }

    return { canVote: true, massage: "" }
}

const verifyVoter = ({ password, name }) => {
    const voter = votersData.find((item) => item.name === name)

    if (voter && compareHash(password, voter.password)) {
        return voter
    }
    return false
}

const loginVote = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    return new Promise((resolve, reject) => {
        let name = ""
        let password = ""

        rl.question("Enter name: ", (data) => {
            name = data

            rl.question("Enter password: ", (data) => {
                password = data
                rl.close()
                resolve({ name, password })
            })
        })
    })
}

const voteGetKeys = async () => {
    const keys = generateKeyPair()
    console.clear()
    console.log(`Public key:\nE: ${keys.publicKey.E}\nN: ${keys.publicKey.N}\n`)
    console.log(
        `Private key:\nD: ${keys.privateKey.D}\nN: ${keys.privateKey.N}\n`
    )

    globalData.privateKey = keys.privateKey
    globalData.publicKey = keys.publicKey

    menu()
}

const vote = async () => {
    const verify = await voterHasVoted(globalData.voter)

    if (verify.canVote === false) {
        console.log(verify.massage)
        return
    }

    if (!globalData.privateKey || !globalData.publicKey) {
        console.clear()
        console.log("!First generate keys\n")
        menu()
        return
    }
    console.clear()
    console.log("Choose a candidate:\n")
    candidatesData.forEach((candidate, index) => {
        console.log(`${candidate.name}: ${index + 1}`)
    })
    const chose = await simpleRead("\nI vote for: ")

    if (
        Number.isNaN(chose) ||
        Number(chose) <= 0 ||
        Number(chose) > candidatesData.length
    )
        return
    const selectedCandidate = candidatesData[Number(chose)]

    console.clear()

    const cecPass = await simpleRead("Enter cec key: ")
    const hashCec = createHash(cecPass)

    // Кодування ключом бюлетня ЦВК
    const encryptedCandidate = encryptWithGamma(selectedCandidate.id, hashCec)

    const signature = generateVoterSignature(
        globalData.voter,
        globalData.publicKey,
        globalData.privateKey
    )

    recordVote({
        voter: globalData.voter,
        encryptedCandidate,
        signature,
        publicKey: globalData.publicKey,
    })

    console.log("Ваш голос успішно записаний")

    mainMenu()
}

const voter = async () => {
    console.clear()
    const userData = await loginVote()
    const voter = await verifyVoter(userData)
    globalData.voter = voter

    if (!voter) {
        console.log("Incorrect password or name")
        return
    }

    menu(true)
}

function menu(isClearHistory) {
    const actions = [
        {
            action: 1,
            name: "Get keys",
            func: () => voteGetKeys(),
        },
        { action: 2, name: "Vote", func: vote },
    ]

    createMenu(actions, isClearHistory)
}

module.exports = {
    voter,
}
