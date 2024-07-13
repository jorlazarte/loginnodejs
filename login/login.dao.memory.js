import db2 from 'mysql2/promise';

async function createConnection() {
	try {
		const connection = await db2.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'nodejsv1'
		});
		return connection;
	
	} catch (error) {
		console.error('Error al crear la conexión a la base de datos:', error);
	throw error;
	}
}
/*****************************************fin opcion1***************************************/


/*****************************************opcion2***************************************/
/*
const pool = db2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejsv1'
});
*/
/*****************************************fin opcion2***************************************/
const getUsers = async () => {
	const sql = "SELECT * FROM users"

	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql)
		console.log("memory.getUsers", rows)
		return rows;

	} catch (error) {
		console.error('Error en getUsers:', error);
		throw error;
	}
	
}

const getUserById = async (id) => {
	const sql = "SELECT * FROM users WHERE id = ?"

	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [id])
		console.log("memory.getUserById", rows)
		return rows;

	} catch (error) {
		console.error('Error en getUsers:', error);
		throw error;
	}
	
}

const getUserByEmail = async (email) => {
	console.log('getUserByEmail', email)
	
	const sql = "SELECT * FROM users WHERE email = ?"

	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [email])
		console.log("memory.getUserByEmail", rows)
		return rows

	} catch (error) {
		console.error('Error en query2:', error);
		throw error
	}
}

const storeUser = async (user) => {

	console.log('storeUser', user.email, user.username, user.apellidoynombre, user.password)
	
	//const sql = "INSERT INTO users (username, email, password) VALUES ('?,?,?)"
	const sql = "INSERT INTO users (email, password, username, name, type) VALUES (?, ?, ?, ?, ?)"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [user.email, user.password, user.username, user.apellidoynombre, user.type])
		console.log("memory.storeUser", rows)
		return rows

	} catch (error) {
		console.error('Error en query2:', error)
		throw error
	}
	
}


export const db = {
	getUsers,
	getUserById,
	storeUser, 
	getUserByEmail
}


/* ANTERIORRRRRR!
let id = 1

const users = []

function getUsers(){
	return users
}

function getUserById(id){
    const result = users.find(
    							user => user.id === parseInt(id)
        					)
    return result
}

function createUser(user){
    user = { id: id++, ...user }
    users.push(user)
    return true
}

export const db = {
	getUsers,
	getUserById,
	createUser
}
*/