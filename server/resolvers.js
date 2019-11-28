const users = require('./users');

module.exports = {
  Query: {
    // Return user if exists, null if it doesn't
    login: (_, {email, password}) => {
      const user = users.find(user => {
        if (user.email === email && user.password === password) return user
      })      
      return user ? user : null     
    }
  },
}