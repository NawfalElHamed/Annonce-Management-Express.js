const express = require('express');
const app = express();

const {connection} = require('./Config/database')

const database = connection()

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extends:true}))

const userRouter = require('./Routes/userRoute')
const annonceRouter = require('./Routes/annonceRoute')


app.use('/',userRouter)
app.use('/',annonceRouter)


database.connectToMongo()

app.listen(5000,()=>{
    console.log('listening on 5000')
})