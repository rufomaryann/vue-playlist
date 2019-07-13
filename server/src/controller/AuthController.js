const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtRegUser(user){
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

function getErrorMessage(error){
    if(error.name==='SequelizeUniqueConstraintError'){
        return "Email address already in use"
    } 
    return error;
}

module.exports = {
    async register(req, res) {
        try {
            const user = await User.create(req.body)

            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token : jwtRegUser(userJson)
            })
        } catch (err) {
            res.status(400).send({
                error: getErrorMessage(err)
            })
        }
    },
    async login(req, res) {
        try {
            const {email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(!user){
                res.status(403).send({
                    error: "Invalid login credentials"
                })
            }

            const isValidPassword = await user.comparePassword(password)
            if(!isValidPassword){
                res.status(403).send({
                    error: "Invalid login credentials"
                })
            }

            const userJson = user.toJSON();
            res.send({
                user: userJson,
                token : jwtRegUser(userJson)
            })
        } catch (error) {
            res.status(500).send({
                error: error
            })
        }
    }
}
