module.exports = {
    port: 3000,
    db: {
        database: process.env.DB_NAME || 'playlist',
        user: process.env.DB_USER || 'playlistuser',
        password: process.env.DB_PASSWORD || '',
        options: {
            dialect: process.env.DB_DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            operatorsAliases: 'false',
            storage: './playlist.sqlite'
        }
    },
    authentication: {
        jwtSecret : process.env.JWT_SECRET || 'secret'
    }
}