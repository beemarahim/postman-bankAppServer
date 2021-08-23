users = {
  1000: { acno: 1000, username: "Beema", password: "userone", balance: 5000, transaction: [] },
  1001: { acno: 1001, username: "Minnu", password: "usertwo", balance: 6000, transaction: [] },
  1002: { acno: 1002, username: "Don", password: "userthree", balance: 7000, transaction: [] },
  1003: { acno: 1003, username: "Tom", password: "userfour", balance: 8000, transaction: [] }
}

const register = (acno, username, password) => {

  //console.log("Register called")

  if (acno in users) {

    return {
      statusCode: 422,
      status: false,
      message: "User exists..... Please Log In!!!!!!"
    }

  }
  else {
    users[acno] = {
      acno,
      username,
      password,
      balance: 0,
      transaction: []
    }

    return {
      statusCode: 200,
      status: true,
      message: "Successfully Registered!!!!!!"
    }

  }

}


const login = (req, acno, pswd) => {



  if (acno in users) {
    if (pswd == users[acno]["password"]) {

      currentUser = users[acno]["username"]

      req.session.currentAcc = acno

      return {
        statusCode: 200,
        status: true,
        message: "Successfully Logged In"
      }
    }
    else {

      return {
        statusCode: 422,
        status: false,
        message: "Invalid password"
      }
    }

  }
  else {

    return {
      statusCode: 422,
      status: false,
      message: "Invalid account number"
    }
  }


}


const deposit = (acno, pswd, amount) => {



  var amt = parseInt(amount)
  if (acno in users) {
    if (pswd == users[acno]["password"]) {
      users[acno]["balance"] += amt
      users[acno].transaction.push({
        amount: amt,
        type: "CREDIT"
      })
      // console.log(users[acno].transaction)


      return {
        statusCode: 200,
        status: true,
        message: amt + "Credited successfully and new balance is :" + users[acno]["balance"]
      }
    }
    else {

      return {
        statusCode: 422,
        status: false,
        message: "Invalid password"
      }

      // alert("Invalid Password")
      //  return false
    }
  }
  else {
    // alert("Invalid Account Number")
    // return false
    return {
      statusCode: 422,
      status: false,
      message: "Invalid account number"
    }


  }

}


const withdraw = (acno1, pswd1, amount1) => {



  var amt1 = parseInt(amount1)
  if (acno1 in users) {
    if (pswd1 == users[acno1]["password"]) {
      if (users[acno1]["balance"] > amt1) {
        users[acno1]["balance"] -= amt1
        users[acno1].transaction.push({
          amount: amt1,
          type: "DEBIT"
        })



        return {
          statusCode: 200,
          status: true,
          message: amt1 + " Debited successfully and new balance is :" + users[acno1]["balance"]
        }
      }
      else {

        return {
          statusCode: 422,
          status: false,
          message: "Insufficient balance"
        }

      }


    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "Invalid password"
      }
    }
  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "Invalid account number"
    }
  }
}



const getTransaction=(req)=> {


  return {
    statusCode: 200,
    status: true,
    transaction:users[req.session.currentAcc].transaction

  }

  
}

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}