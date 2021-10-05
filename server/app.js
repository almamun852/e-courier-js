const { request, response } = require('express')
const express=require('express')
const app=new express()
PORT =5000
const mongoose=require('mongoose')
const {MONGOURI}=require('./keys')
// const cors = require('cors')

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
mongoose.connection.on('connected',()=>{
    console.log('mongo db connected')
})
mongoose.connection.on('error',(err)=>{
    console.log('error occur',err)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})