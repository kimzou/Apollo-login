const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['INSTRUCTOR', 'ADMIN'],
        required: true,
    }
})

UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) return next()

    this.password = Bcrypt.hashSync(this.password, 10)

    next()
})

module.exports = mongoose.model('User', UserSchema);
