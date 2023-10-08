const readline = require("readline")

const createMenu = async (actions, withClear) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    if (withClear) console.clear()
    actions.forEach((action) => {
        console.log(`${action.name}: ${action.action}`)
    })

    rl.question("Select action: ", (data) => {
        const selectedAction = actions.find((item) => item.action == data)
        if (!selectedAction) {
            withClear && console.clear()
            return
        }
        rl.close()
        selectedAction.func()
    })
}

const simpleRead = (question = "") => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve, reject) => {
        rl.question(question, (data) => {
            rl.close()
            resolve(data)
        })
    })
}

module.exports = {
    createMenu,
    simpleRead
}
