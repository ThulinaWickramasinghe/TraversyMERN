const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

const goalRoutes = require('./routes/goal.routes')
app.use('/api/goals' , goalRoutes)

app.use(errorHandler)
app.listen(port, () => console.log(`Server has started on port ${port}`))
