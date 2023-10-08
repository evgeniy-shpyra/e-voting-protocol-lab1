const readline = require("readline")
const { verifyCec } = require("./auth")

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
    const cecData = await loginCec()
    if (verifyCec(cecData)) {
        console.log("auth")
    } else {
       
        console.log("Incorrect password")
        return
    }
}

module.exports = {
  cec,
}
