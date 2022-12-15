const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const userRoute = require('./router/userRoute')
app.use('/api/user', userRoute)

app.listen(PORT, () => { console.log('server started at port 5000') })