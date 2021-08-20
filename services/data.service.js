users = {
    1000: { acno: 1000, username: "Beema", password: "userone", balance: 5000, transaction: [] },
    1001: { acno: 1001, username: "Minnu", password: "usertwo", balance: 6000, transaction: [] },
    1002: { acno: 1002, username: "Don", password: "userthree", balance: 7000, transaction: [] },
    1003: { acno: 1003, username: "Tom", password: "userfour", balance: 8000, transaction: [] }
  }

   const register=(acno, username, password)=> {

    console.log("Register called")
    
    if (acno in users) {

      return{
        statusCode:422,
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
     
      return{
        statusCode:200,
        status: true,
        message: "Successfully Registered!!!!!!"
       } 
        
    }

  }


  const login=(acno, pswd)=> {

    

    if (acno in users) {
      if (pswd == users[acno]["password"]) {

        currentUser = users[acno]["username"]
        currentAcc=acno

        return {
          statusCode:200,
          status: true,
          message: "Successfully Logged In"
        }
      }
      else {
      
        return {
          statusCode:422,
         status: false,
         message: "Invalid password"
        }
      }

    }
    else {
     
      return{
        statusCode:422,
        status: false,
        message: "Invalid account number"
      }
    }


  }




  module.exports={
      register,
      login
  }