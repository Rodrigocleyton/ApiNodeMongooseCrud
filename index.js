const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const Person = require('./models/Person')



//config para ler json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//rotas api
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

//mongoDBAtlas
mongoose.connect('mongodb+srv://usuario:senha@cluster0.kw1kagt.mongodb.net/bancoapi?retryWrites=true&w=majority ')
.then(()=>{
    console.log("conectado com sucesso!")
}).catch((err)=>{
    console.log(err)
})


/*banco local
mongoose.connect('mongodb://localhost:27017/bancoapi2')
.then(()=>{
    console.log("conectado com sucesso!")
}).catch((err)=>{
    console.log(err)
})
*/



app.listen(port, ()=>{
    console.log("BackEnd rodando porta ", port)
})

