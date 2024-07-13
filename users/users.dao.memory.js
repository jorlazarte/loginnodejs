import { createConnection } from '../db/conn.mysql.js'

const getUsers = async () => {
	const sql = "SELECT * FROM user"

	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql)
		console.log("memory.getUsers", rows)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en getUsers:', error);
		throw error;
	}
	
}

const getRoles = async () => {
	const sql = "SELECT * FROM rol"

	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql)
		console.log("memory.getRoles", rows)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en getUsers:', error);
		throw error;
	}
	
}

const getUserById = async (id) => {
	const sql = "SELECT * FROM user WHERE id = ?"

	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [id])
		console.log("memory.getUserById", rows)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en getUsers:', error);
		throw error;
	}
	
}

const getUserByEmail = async (email) => {
	console.log('getUserByEmail', email)
	
	const sql = "SELECT * FROM user WHERE email = ?"

	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [email])
		console.log("memory.getUserByEmail", rows)
		await conn.end();
		return rows

	} catch (error) {
		console.error('Error en query2:', error);
		throw error
	}
}

const storeUser = async (user) => {

	console.log('storeUser', user.email, user.username, user.apellidoynombre, user.password)
	
	//const sql = "INSERT INTO users (username, email, password) VALUES ('?,?,?)"
	const sql = "INSERT INTO user (email, password, username, name, id_rol) VALUES (?, ?, ?, ?, ?)"
	try {
		const conn = await createConnection()
		const [rows] = await conn.query(sql, [user.email, user.password, user.username, user.apellidoynombre, user.type])
		console.log("memory.storeUser", rows)
		await conn.end();
		return rows

	} catch (error) {
		console.error('Error en query2:', error)
		throw error
	}
	
}

const storeEditUser = async (user) => {

	console.log('storeUser', user.id, user.name, user.username, user.email, user.type)
	
	const sql = "UPDATE user SET name=?,username=?,email=?,id_rol=? WHERE id=?"
	try {
		const conn = await createConnection(); 
		const [rows] = await conn.query(sql, [user.name, user.username, user.email, user.type, user.id])
		console.log("memory.storeEditUser", rows)
		await conn.end();
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
	getUserByEmail,
	storeEditUser,
	getRoles
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