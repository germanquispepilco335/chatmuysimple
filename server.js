import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

io.on('connection', (socket) => {
  const username = socket.handshake.auth.username || 'Anónimo'
  console.log('✅', username, 'se conectó')

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg, username)
  })
})

server.listen(3000, () => {
  console.log('🚀 Servidor en http://localhost:3000')
})