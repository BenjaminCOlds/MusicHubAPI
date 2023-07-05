const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = require('../Secret')

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
}

const loginAge = 7 * 24 * 60 * 60

// JWT Creation Function
const createJWT = (id) => {
    return jwt.sign({ id }, secret.secret, {
        expiresIn: loginAge
    })
}


module.exports.register_post = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = User.create({
            email, password
        })
        res.status(201).json({user: (await user)._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(409).json({ errors })
    }
}

module.exports.login_post =async  (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password);
        const token = createJWT(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: loginAge * 1000});
        res.status(200).json( {jwt: token})
    } catch (err) {
        const errors = handleErrors(err);
        res.status(401).json({ errors })
    }
}

module.exports.logout_post = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1})
    res.status(200).json({message:  "You have been logged out."})
}