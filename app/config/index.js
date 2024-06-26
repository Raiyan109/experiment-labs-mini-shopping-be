const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join((process.cwd(), ".env")) });

module.exports = {
    port: process.env.PORT,
    database_url: process.env.MONGO_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_secret: process.env.JWT_SECRET,
    stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY
};