const express = require('express')
const session = require('express-session')
const dataService = require('./services/data.service')
const app = express()

app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))


app.use((req,res,next)=>{
    console.log(" application specific Middleware")
    next()
})

const authMiddleware = (req,res,next)=>{

    if(!req.session.currentAcc){
         res.json( {
          statusCode:422,
         status: false,
         message: "Please Log In"
        })
      }
      else{
          next()
      }
}


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
    res.status(result.statusCode).json(result)

})

app.post('/login',(req,res)=>{
   // console.log(req.sessionID)
    const result = dataService.login(req,req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)

})

app.post('/deposit',authMiddleware,(req,res)=>{
console.log(req.session.currentAcc)
    const result = dataService.deposit(req.body.acno,req.body.pswd,req.body.amount)
    res.status(result.statusCode).json(result)

})

app.post('/withdraw',authMiddleware,(req,res)=>{

    const result = dataService.withdraw(req.body.acno1,req.body.pswd1,req.body.amount1)
    res.status(result.statusCode).json(result)

})

app.post('/getTransaction',authMiddleware,(req,res)=>{

    const result = dataService.getTransaction(req)
    res.status(result.statusCode).json(result)

})
app.listen(3000,()=>{
    console.log('Server started at Port Number:3000');
})

