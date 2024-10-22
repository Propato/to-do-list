import { createPool } from 'mysql2/promise';

export const connection = async () => {
    const pool = await createPool({
        port: 3306,
        host: "mysqldb",
        database: "Tasks-db",
        
        user: process.env.DB_USER || "userDefault",
        password: process.env.DB_PASSWORD || "passwordDefault"
    });
    return pool;
}