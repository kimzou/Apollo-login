const User = require('./Models/user');
const Bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  Query: {
    me: async (_, __, { cache }) => {
      try {
        const { id } = localStorage.getItem(token)
        console.log({id});
        return await User.findOne({ _id: id })

      } catch (e) {
        console.error(e);
      }
    }
  },
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
          { id: res._id },
          process.env.API_SECRET,
          { expiresIn: '1h' }
        );

        // delete res.password;
        // console.log({res});
        
        return { token: token, user: res };

      } catch (error) {
        console.error(error);
      }
    }
  },
}