module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSOWRD,
        database: process.env.DB_NAME
    }
}