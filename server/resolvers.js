const User = require('./Models/user');
const Bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  Mutation: {
    // Return user if exists, null if it doesn't or if the password is wrong
    login: async (_, { email, password }) => {
      try {
        const res = await User.findOne({ email: email })
        if (!res) {
          throw new Error('User not found')
        }  
        const passwordOk = await Bcrypt.compare(password, res.password)
  
        if (!passwordOk) {
          throw new Error('Wrong password')
        }
  
        const token = await jwt.sign(
          { role: res.role },
          process.env.API_SECRET,
          { expiresIn: '1h' }
        );
        
        return {
          token: token
        };
      } catch (error) {
        console.error(error);
      }
    }
  },
}