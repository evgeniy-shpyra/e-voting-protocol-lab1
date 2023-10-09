const { voter } = require("./voter")
const { cec } = require("./cec")
const { createMenu } = require("./helpers/ui")

const mainMenu = () => {
    const actions = [
        { action: 1, name: "For vote", func: voter },
        { action: 2, name: "For cec", func: cec },
    ]
    createMenu(actions)
}

const main = () => {
    mainMenu()

    return
}
console.clear()
main()



