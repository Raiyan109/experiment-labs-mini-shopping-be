const User = require('../user/user.model.js')
const bcrypt = require('bcrypt')
const { userSchema } = require('./user.validation.js')
const config = require('../../config/index.js')
const jwt = require('jsonwebtoken')


// signup user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body
    // Hashing
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    // const zodParsedData = userSchema.parse({ name, email, password: hashedPassword })

    try {

        // const user = await User.create(zodParsedData)
        const user = await User.create({ name, email, password: hashedPassword, parts: [] })

        // const token = createToken(user._id)

        res.status(200).json({ user })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // let existingUser;
        let existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({ msg: 'Could not found user by this email' })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: 'Incorrect Password' })
        }

        const token = jwt.sign({
            userId: existingUser._id.toString()
        }, config.jwt_secret, { expiresIn: '7d' })

        res.status(200).json({
            message: "Login success",
            user: existingUser,
            access_token: token
        })

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
}

module.exports = { loginUser, signupUser }