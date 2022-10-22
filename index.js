const jwt = require('jsonwebtoken')

const cors=require('cors')

// Server creation

//  1. Import express and store in a constant variable
// const { request } = require('express');
const express = require('express')

//  2.  App creation using express
const app = express() //app-variable; express()-method


// give commands to share data via cors
app.use(cors({origin:'http://localhost:4200'}))


// to parse json datas from request
app.use(express.json())

//  3.  Create port number  ;server runs in port number 3000 series; angular runs in port 4000 series
app.listen(3000, () => { console.log('server started at port no. 3000'); })


// import dataservice file from service folder to use register function
const dataService = require('./service/dataservice')

//  1. REGISTER -post
app.post('/register', (req, res) => {
    console.log(req.body);
    // its a response of asynchronous request so we cant store the o/p in a variable, so we use then to access & store the o/p
    dataService.register(req.body.acno, req.body.username, req.body.password).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//middleware creation  to check token is valid -verify()

const jwtmiddleware = (req, res, next) => {

    try {
        console.log('router specific middleware start----------');
        //the token from client

        token = req.headers['token1']
        //validate token

        const data = jwt.verify(token, 'secretkey123')
        console.log(data);


        //to take next request after the working of middleware
        next()
    }

    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: 'please login'
        })
    }
}



// LOGIN
app.post('/login', (req, res) => {
    console.log(req.body);
    dataService.login(req.body.acno, req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})




// DEPOSIT
app.post('/deposit', jwtmiddleware, (req, res) => {
    console.log(req.body);
    dataService.deposit(req.body.acnum, req.body.pswrd, req.body.amnt).then(result=>{
        res.status(result.statusCode).json(result)
    })
})




// WITHDRAW
app.post('/withdraw', (req, res) => {
    console.log(req.body);
    dataService.withdraw(req.body.acnum, req.body.pswrd, req.body.amnt).then(result=>{
        res.status(result.statusCode).json(result)
    })
})




// TRANSACTION HISTORY
app.post('/getTransaction', (req, res) => {
    console.log(req.body);
    dataService.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


// DELETE
app.delete('/deleteacc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})







//  Resolve http request

// Get request
// app.get('/',(req,res)=>{
//     res.send('get method...')
// })

// // post request
// app.post('/',(req,res)=>{
//     res.send('Patch method...')
// })

// // put request
// app.put('/',(req,res)=>{
//     res.send('Patch method...')
// })

// // patch request
// app.patch('/',(req,res)=>{
//     res.send('Patch method...')
// })

// // Delete request
// app.delete('/',(req,res)=>{
//     res.send('Delete method...')
// })