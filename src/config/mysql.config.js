import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

// create a pool to contain database connection
// whenever we want to connect to the database
// the variable pool is called

/* 
    @dev replace the host with the ip address which your
    server is running on and all the instances of your mysql database
**/

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    connectionLimit : process.env.DB_CONNECTION_LIMIT
});

export default pool;
