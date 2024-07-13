import db2 from 'mysql2/promise';
//import db1 from 'mysql2'
/*****************************************opcion1***************************************/
/*
const connection = db2.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodejsv1'
})

connection.connect( (err) => {
	if( err ){
		consol.error('Error conection: ', err)
	}	
	console.log('OK db')
} )
*/
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
const getBlogs = async () => {
	const sql = "SELECT * FROM users"

	console.log('getBlogs')
	/*
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql)
		console.log("memory.getUsers", rows)
		return rows;

	} catch (error) {
		console.error('Error en getUsers:', error);
		throw error;
	}
	*/
	
}

const storeBlog = async (user) => {
	
	console.log('storeBlog', )
	
	//const sql = "INSERT INTO users (username, email, password) VALUES ('?,?,?)"
	const sql = "INSERT INTO blogs (titulo) VALUES (?)"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [user.email, user.password, user.username, user.apellidoynombre, user.type])
		console.log("memory.createUser", rows)
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
	*/
	
}

export const db = {
	getBlogs,
	storeBlog
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