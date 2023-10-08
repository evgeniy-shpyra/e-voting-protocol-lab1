const readline = require("readline")
const { cecData } = require("./data/cec")
const { compareHash, createHash } = require("./helpers/hash")
const { simpleRead } = require("./helpers/ui")
const { seeResultAndDecrypt } = require("./manager")


const loginCec = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    return new Promise((resolve, reject) => {
        let password = ""

        rl.question("Enter password: ", (data) => {
            password = data
            rl.close()
            resolve({ password })
        })
    })
}


const cec = async () => {
    const { password } = await loginCec()

    if (!compareHash(password, cecData.password)) {
        console.log("Incorrect password")
        return
    }
    console.clear()
    const keyForDecryption = await simpleRead("Enter key for decryption: ")
    seeResultAndDecrypt(createHash(keyForDecryption))

}

module.exports = {
    cec,
}
