const micro = require('micro')
const index = require('./app')

const port = parseInt(process.env.PORT, 10) || 2000
const server = micro(index)

server.listen(port)
