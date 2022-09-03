const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const goalRoutes = require('./routes/goal.routes')
const userRoutes = require('./routes/user.routes')

const connectDB = require('./config/db')
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/goals' , goalRoutes)
app.use('/api/users' , userRoutes)
app.use(errorHandler)
app.listen(port, () => console.log(`Server has started on port ${port}`))
