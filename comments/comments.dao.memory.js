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
const getComments = async () => {

	console.log('getComments')
	const sql = "SELECT * FROM Comment"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql)
		console.log("memory.getComments", rows)
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
	
}

const getCommentById = async (id) => {

	console.log('getComments')
	const sql = "SELECT * FROM Comment WHERE id = ?"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [id])
		console.log("memory.getComments", rows)
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
	
}

const storeComment = async (comment) => {
	
	console.log('memory storeComment', comment)
	console.log('memory storeComment', comment.commentIdUser)
	
	const sql = "INSERT INTO Comment (title, textComment, id_user) VALUES (?, ?, ?)"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [comment.commentTitle, comment.commentBody, parseInt(comment.commentIdUser)])
		console.log("memory.storeComment", rows)
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
}

const storeEditComment = async (comment) => {
	
	console.log('memory storeEditComment', comment)
	console.log('memory storeEditComment id Comment', comment.commentId)
	
	const sql = "UPDATE comment SET title=?,textComment=? WHERE id=?"
  
  try {
    const conn = await createConnection();
    const result = await conn.query(sql, [comment.commentTitle, comment.commentBody, comment.commentId] )
    //await conn.end();
    console.log("memory.storeEditComment resultado", result)

    return result;  
  
  } catch (error) {
    console.error('Error en createUser:', error);
    throw error;
  }
  
}


export const db = {
	getComments,
	getCommentById,
	storeComment,
	storeEditComment
}