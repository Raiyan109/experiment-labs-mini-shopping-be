const express = require('express');
const { loginUser, signupUser } = require('../user/user.controller');



const router = express.Router()



// login user
router.post('/signin', loginUser)

// signup user
router.post('/signup', signupUser)



module.exports = router