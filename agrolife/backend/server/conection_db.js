import mysql from "mysql2/promise"

// Connection database Mysql
export const pool = mysql.createPool({
  host: "localhost",                              
  user: "root",                                
  password: "Qwe.123*",                                
  database: "test_wilffren_malecon",    
  port: 3306,                            
  waitForConnections: true,                       
  queueLimit: 0,                                  
})


async function testConnectionMysql() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connection to the database successful ');
        connection.release();
    } catch (error) {
        console.error('❌ Error connecting to the database:', error.message);
    }
}
testConnectionMysql();