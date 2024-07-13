import db1 from 'mysql2/promise';

const pool = db1.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejsv1'
});

const connection = await pool.getConnection();

export async function query2() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM tabla2');
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error en query2:', error);
    throw error;
  }
}

const getUserByName = async (username) => {
  console.log('getUserByName', username)
  
  const sql = "SELECT * FROM usuarios WHERE nombre = ?"

  try {
    //const conn =  connection.getConnection();
    const [rows] = await connection.query( sql , [username] );
    //connection.release();
    return rows;

  } catch (error) {
    console.error('Error en query2:', error);
    throw error;
  }
  
}

export const db = {
  //getUsers,
  //getUserById,
  //createUser, 
  getUserByName
}