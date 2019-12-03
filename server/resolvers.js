const User = require('./Models/user');
const Bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  Mutation: {
    // Return a token if credentials match the user and if his role is admin or instructor, otherwise it throw errors
    login: async (_, { email, password }) => {
      try {
        const res = await User.findOne({ email: email })

        if (!res) return { error: "User not found" }

        const passwordOk = await Bcrypt.compare(password, res.password)
  
        if (!passwordOk) return { error: "Wrong password" }
        
        if (res.role !== "ADMIN" && res.role !== "INSTRUCTOR") return { error: "Not authorized" }
  
        const token = await jwt.sign(
          { role: res.role },
          process.env.API_SECRET,
          { expiresIn: '1h' }
        );

        return { token: token };

      } catch (error) {
        console.error(error);
      }
    }
  },
}