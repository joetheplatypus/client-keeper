module.exports = {
  port: 8081,
  db: {
    database: process.env.DB_NAME || 'clientkeeper',
    user: 'user',
    password: 'pass',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: 'localhost',
      storage: './clientkeeper.sqlite'
    }
  }
}
