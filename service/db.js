// 1. server-mongo db intergration :

// import
const mongoose=require('mongoose')

// state connection string using mongoose
mongoose.connect('mongodb://localhost:27017/bankserver',{useNewUrlParser:true}) // to avoid parser error


// 2. Define db(bankserver) model //colletion appropriate model
// collection name: users  //so model name should be User  //collection-plural//modal-singular,first capital letter
const User=mongoose.model('User',{    //here User is a class, while we add a new users it will be this User class's object
    acno: Number, //datatype should be specified
    username: String,
    password: Number,
    balance: Number,
    transaction: []
})


// Export model to use in server
module.exports={
    User
}