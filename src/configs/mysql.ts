import mysql from 'mysql2/promise'

export async function connMysql() {
  let pool = mysql.createPool({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASS,
    port: Number(process.env.MYSQL_PORT),
    connectionLimit: 10000,
    waitForConnections: true,
    connectTimeout: 100000,
    maxIdle: 100000,
    idleTimeout: 600000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  })

  return pool
}
