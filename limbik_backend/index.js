const http = require('http')

const express = require('express')

const app = express() 

const cors = require('cors')

const data = require('./index.json')

app.use(cors())

app.get('/api/v1/posts', (req, res, next) => {
    res.json(data)
})


app.listen(3000)
