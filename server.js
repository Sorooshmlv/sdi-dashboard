// server.js
const https = require('https')
const fs = require('fs')
const next = require('next')

const app = next({ dev: false }) // اگر در حالت توسعه‌ای هستی، بذار dev: true
const handle = app.getRequestHandler()

const options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
}

app.prepare().then(() => {
  https
    .createServer(options, (req, res) => {
      handle(req, res)
    })
    .listen(443, () => {
      console.log('> Server running on https://localhost')
    })
})
