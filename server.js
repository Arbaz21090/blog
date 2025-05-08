const  express = require('express')
const colors=require("colors")
const morgan=require('morgan')
const dotenv=require("dotenv")
const connectDB = require('./db/database')
const userRoutes=require('./routes/userRoutes')
const blogRoutes=require('./routes/blogRoutes')
const app = express()
dotenv.config()
const port = process.env.PORT || 3000


connectDB()
app.use(express.json())

app.use('/api/v1', userRoutes)
app.use('/api/v1', blogRoutes)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`app listening on port ${port}!`.bgRed))