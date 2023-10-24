const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

// Middleware - before req/res you can specify the URLS affected
app.use(express.json())
// Could track request to DB
// Could if user has cookies
// ...
/* app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // After the if's, we only get POST request at this point with header Content-Type: application/json
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()

    // Going to mutate the request and add the info to the req.body
    req.body = data
    next()
  })
}) */

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

app.post('/pokemon', (req, res) => {
  // With req.body we should store it in DB
  res.status(201).json(req.body)
})

// at the end
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})
