const crypto = require('crypto');


const votersData = [
  {
    id: 1,
    name: "Voter1",
    password: '0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c', //1111
    canVote: true
  },
  {
    id: 2,
    name: "Voter2",
    password: 'edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9', //2222
    canVote: true
  },
  {
    id: 3,
    name: "Voter3",
    password: '318aee3fed8c9d040d35a7fc1fa776fb31303833aa2de885354ddf3d44d8fb69', //3333
    canVote: false
  },
  {
    id: 4,
    name: "Voter4",
    password: '79f06f8fde333461739f220090a23cb2a79f6d714bee100d0e4b4af249294619', //4444
    canVote: true
  }
]

module.exports = {
  votersData,
}
