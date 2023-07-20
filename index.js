require('dotenv').config()
const express = require('express');
const cors = require('cors');
require('./db/connection')
const router=require('./routes/router')
const bankServer = express()
const appMiddleware =require('./middlewares/authMiddleware')

bankServer.use(cors())
bankServer.use(express.json())
bankServer.use(appMiddleware.appMiddleware)

bankServer.use(router)
const PORT = 3005 || process.env.PORT

bankServer.listen(PORT, () => {
    console.log(`bank server is running at http://localhost:${PORT}`)
})

bankServer.get('/', (req, res) => {
    res.status(200).send(`<h2 style="color:green;">bank server started....</h2>${req.params} `)
})