const { voter } = require("./voter")
const { cec } = require("./cec")
const { createMenu } = require("./helpers/ui")
const { decryptWithGamma } = require("./helpers/gammaEncrypting")
const { createHash } = require("./helpers/hash")

const menu = () => {
    const actions = [
        { action: 1, name: "For vote", func: voter },
        { action: 2, name: "For cec", func: cec },
    ]
    createMenu(actions)
}

const main = () => {
    menu()

    return
}
console.clear()
main()

console.log()
