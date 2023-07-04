const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Sorry there is already a user registered with that email.'],
        lowercase: true, 
        required: [true, 'Please enter an email'],
        validate: [isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        minLength: [6, "Sorry your password isn't long enough"]
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})


userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

User = mongoose.model('user', userSchema);
module.exports = User