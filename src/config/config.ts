export default {
    jwtSecret: process.env.JWT_SECRET || 'mitokensecreto',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/gomarketdb',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}