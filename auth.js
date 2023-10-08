const { cecData } = require("./data/cec")


const verifyCec = ({ password }) => {
    // add hash
    return cecData.password === password
}


module.exports = {
  verifyCec,
}
