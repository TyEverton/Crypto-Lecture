const bcrypt = require('bcryptjs')

const chats = []

/*
  chat = {
    pin: ###,
    messages: ['hello, how are you?']
  }
*/

module.exports = {
  createMessage: (req, res) => {
    console.log(req.body)

    const {pin, message} = req.body

    for (let i = 0; i < chats.length; i++) {
      // if (chats[i].pin === pin) {
      //     chats[i].messages.push(message)
      //     res.status(200).send(chats[i])
      //     return

      const existing = bcrypt.compareSync(pin, chats[i].pinHash)

      if(existing) {
        chats[i].messages.push(message)
        let messagesToReturn = {...chats[i]} //if existing, creates a new object with the span of all the chats
        delete messagesToReturn.pinHash
        res.status(200).send(messagesToReturn)
        return
       }
      }
    

    const salt = bcrypt.genSaltSync(5) //salt = adding extra characters to password making it stronger once stored in server. you still enter the same password that you setup, but the server saves it with 5 extra chars. - 5 IS HOW MANY EXTRA characters
    const pinHash = bcrypt.hashSync(pin, salt)

    let msgObj = {
      pinHash, 
      messages: [message]
    }
    chats.push(msgObj)
    console.log(chats)
    let messagesToReturn = {...msgObj}
    delete messagesToReturn.pinHash
    res.status(200).send(messagesToReturn)
  }
}