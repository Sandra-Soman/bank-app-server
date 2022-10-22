//import library generate token
const jwt = require('jsonwebtoken')

// import model
const db = require('./db') //exported model in db will be imporing here.


userDetails = {
  1000: { acno: 1000, username: "amal", password: 123, balance: 100000, transaction: [] },
  1001: { acno: 1002, username: "anu", password: 123, balance: 200000, transaction: [] },
  1002: { acno: 1002, username: "appu", password: 123, balance: 150000, transaction: [] },
  1003: { acno: 1003, username: "anju", password: 123, balance: 10000, transaction: [] }
}



//register
const register = (acno, username, password) => {

  return db.User.findOne({ acno }).then(user => { // return is used to get output in thunderclient
    if (user) {
      return {
        statusCode: 401,
        status: false,
        message: 'User already exist'
      }
    }
    else {
      //insert data into db
      const newuser = new db.User({ acno, username, password, balance: 0, transaction: [] })
      // to store the object in collection
      newuser.save()
      return {
        statusCode: 200,
        status: true,
        message: 'Registration Success'
      }
    }
  })
}
//  // here the if-else condition is replaced with above steps 
//   if (acno in userDetails) {
//     return {
//       statusCode: 401,
//       status: false,
//       message: 'User already exist'
//     }
//   }
//   else {
//     userDetails[acno] = { acno, username, password, balance: 0, transaction: [] }
//     console.log(userDetails)
//     return {
//       statusCode: 200,
//       status: true,
//       message: 'Registration Success'
//     }
//   }
// }



//login
const login = (acno, psw) => {
  return db.User.findOne({ acno, password: psw }).then(user => { //findone is an asychrounous method
    if (user) {
      currentUser = user.username
      currentAcno = acno
      const token = jwt.sign({ currentAcno: acno }, 'secretkey123')
      return {
        statusCode: 200,
        status: true,
        message: 'Login Success1',
        currentUser,
        currentAcno,
        token
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: 'incorrect Account number or Password'
      }
    }
  })
}

// if (acno in userDetails) {
//   if (psw == userDetails[acno]['password']) {
// currentUser = userDetails[acno]['username']
// currentAcno = acno
// const token = jwt.sign({ currentAcno: acno }, 'secretkey123')
// //string without space
// return {
//   statusCode: 200,
//   status: true,
//   message: 'Login Success',
//   currentUser,
//   currentAcno,
//   token
// }
//     }
//     else {
//       return {
//         statusCode: 401,
//         status: false,
//         message: 'incorrect password'
//       }
//     }
//   }
//   else {
//     return {
//       statusCode: 401,
//       status: false,
//       message: 'Not a registered user'
//     }
//   }
// }



//deposit
const deposit = (acnum, pswrd, amnt) => {
  var amount = parseInt(amnt)
  return db.User.findOne({ acno: acnum, password: pswrd }).then(user => { //user is an argument used to store the output of that .then
    if (user) {
      user.balance += amount
      user.transaction.push({ type: 'CREDIT', amount })

      user.save() //to save the updations in database. like we do in register
      return {
        statusCode: 200,
        status: true,
        message: `${amount} :is Credited and your new balance is: ${user.balance}`
      }
    }
    else {
      return {
        statusCode: 401,
        status: true,
        message: 'incorrect Account number or Password'
      }
    }
  }
  )
}

// if (acnum in userDetails) {
//   if (pswrd == userDetails[acnum]['password']) {
// userDetails[acnum]['balance'] += amount
// userDetails[acnum]['transaction'].push({ type: 'CREDIT', amount })

// return {
//   statusCode: 200,
//   status: true,
//   message: `${amount} credited  and new balance is ${userDetails[acnum]['balance']}`
// }
//}
// else {
//   return {
//     statusCode: 401,
//     status: true,
//     message: 'incorrect password'
//   }
// }
//   }
//   else {
//     return {
//       statusCode: 401,
//       status: false,
//       message: 'invalid'
//     }
//   }
// }




//withdraw
const withdraw = (acnum, pswrd, amnt) => {
  var amount = parseInt(amnt)
  return db.User.findOne({ acno: acnum, password: pswrd }).then(user => { //user is an argument used to store the output of that .then
    if (user) {
      if (user.balance > amount) {
        user.balance -= amount
        user.transaction.push({ type: 'DEBIT', amount })

        user.save() //to save the updations in database. like we do in register
        return {
          statusCode: 200,
          status: true,
          message: `${amount} :is debited and your new balance is: ${user.balance}`
        }
      }
      else {
        return {
          statusCode: 401,
          status: false,
          message: 'insufficient balance'
        }
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: 'incorrect Account number or Password'
      }
    }
  })
}




//   if (acnum in userDetails) {
//     if (pswrd == userDetails[acnum]['password']) {
//       if (userDetails[acnum]['balance'] >= amnt) {
//         userDetails[acnum]['balance'] -= amount
//         userDetails[acnum]['transaction'].push({ type: 'DEBIT', amount })

//         // return userDetails[acnum]['balance']
//         return {
//           statusCode: 200,
//           status: true,
//           message: `${amount} debited  and new balance is ${userDetails[acnum]['balance']}`
//         }
//       }
//     }
//     else {
//       return {
//         statusCode: 401,
//         status: true,
//         message: 'incorrect password'
//       }
//     }
//   }
//   else {
//   return {
//     statusCode: 401,
//     status: false,
//     message: 'invalid'
//   }
// }




//transaction
const getTransaction = (acno) => {
  return db.User.findOne({ acno }).then(user => {
    if (user) {
      return {
        statusCode: 200,
        status: true,
        transaction: user['transaction']
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: 'User doent exist'
      }
    }
  })
}
// return {
//   statusCode: 200,
//   status: true,
//   transaction: userDetails[acno]['transaction']
// }


const deleteAcc = (acno) => {
  return db.User.deleteOne({ acno }).then(user=> {
  if (user) {
    return {
      statusCode: 200,
      status: true,
      message: 'Deleted Successfully'
    }
  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: 'User not exist'
    }
  }
})
  }

module.exports = {
  register, login, deposit, withdraw, getTransaction,deleteAcc
}