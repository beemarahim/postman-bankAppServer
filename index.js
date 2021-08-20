const express = require('express')
const dataService = require('./services/data.service')
const app = express()

app.use(express.json())

app.get('/',(req,res)=>{

    res.send("GET METHOD")

})
app.post('/',(req,res)=>{

    res.send("POST METHOD")

})
app.put('/',(req,res)=>{

    res.send("PUT METHOD")

})
app.patch('/',(req,res)=>{

    res.send("PATCH METHOD")

})
app.delete('/',(req,res)=>{

    res.send("DELETE METHOD")

})


app.post('/register',(req,res)=>{
     //console.log(req.body)
    const result = dataService.register(req.body.acno,req.body.username,req.body.password)
    res.status(result.statusCode).send(result.message)

})

app.post('/login',(req,res)=>{

    const result = dataService.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).send(result.message)

})

app.listen(3000,()=>{
    console.log('Server started at Port Number:3000');
})

