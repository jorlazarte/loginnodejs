import { createConnection } from '../db/conn.mysql.js'

const getPosts = async () => {

	console.log('getPosts')
	const sql = "SELECT * FROM post"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql)
		console.log("memory.getPosts", rows)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
	
}

const getCategorias = async () => {
	console.log('getCategorias')
	const sql = "SELECT * FROM categoria"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql)
		console.log("memory.getCategorias", rows)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
}

const getPostById = async (id) => {

	console.log('getPosts')
	const sql = "SELECT * FROM post WHERE post.id = ?"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [id])
		console.log("memory.getPosts", rows)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
}

const getPostCategoria = async (idPost) => {
	console.log('getPostCategoria')
	const sql = "SELECT categoria.id, categoria.name, CASE WHEN post_categoria.id_post IS NOT NULL THEN 'selected' ELSE '' END AS tiene_post FROM categoria LEFT JOIN post_categoria ON categoria.id = post_categoria.id_categoria AND post_categoria.id_post = ? GROUP BY categoria.id, categoria.name;"
	
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [idPost])
		console.log("memory.getPosts", getPostCategoria)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
}


const deletePostById = async (id) => {

	console.log('getPosts')
	const sql = "DELETE FROM post WHERE id = ?"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [id])
		console.log("memory.deletePostById", rows)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
	
}

const storePost = async (post) => {
	
	console.log('memory storePost', post)
	//console.log('memory storePost', post.postIdUser)
	
	const sql = "INSERT INTO post (title, textPost, image, id_user) VALUES (?, ?, ?, ?)"
	try {
		
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [post.postTitle, post.postBody, post.postImage, post.postIdUser])
		console.log("memory.storePost", rows)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
}

const storePostCategoria = async (idPost, idCat) => {
	
	const sql = 'INSERT INTO post_categoria (id_post, id_categoria) VALUES (?, ?)'

	try {
		const conn = await createConnection();
		const rows = await conn.query(sql, [idPost, idCat])
		//console.log("memory.storePostCategoria", rows)
		await conn.end();
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
	
}


const storeEditPost = async (post) => {
	console.log('*************memory storeEditPost************')
	console.log('memory storeEditPost', post)
	console.log('memory storeEditPost id Post', post.postId)
	console.log('memory storeEditPost id Post categorias', post.postCategorias)

	const delimiter = ',';
	const cLstCategorias = post.postCategorias.toString()
	console.log('memory storeEditPost id Post categorias cLstCategorias', cLstCategorias)
	
	const sql1 = "UPDATE post SET title=?,textPost=?, image=? WHERE id=?"
  const sql2 = "CALL process_array(?, ?);"
  try {
    const conn = await createConnection();
    const result1 = await conn.query(sql1, [post.postTitle, post.postBody, post.postImage, post.postId] )
    console.log("memory.storeEditPost resultado1", result1)
    //await conn.end();
    const result2 = await conn.query(sql2, [post.postId, cLstCategorias] )
    console.log("memory.storeEditPost resultado2", result2)
		await conn.end();  
    return result1;
    
  	
  } catch (error) {
    console.error('Error en createUser:', error);
    throw error;
  }
  
  console.log('*************FIN memory storeEditPost************')
}

const storeComment = async (comment) => {
	
	console.log('memory storeComment', comment)
	/*
	console.log('memory storeComment', comment.postIdUser)
	
	const sql = "INSERT INTO Post (title, textPost, id_user) VALUES (?, ?, ?)"
	try {
		const conn = await createConnection();
		const [rows] = await conn.query(sql, [post.postTitle, post.postBody, post.postIdUser])
		console.log("memory.storePost", rows)
		return rows;

	} catch (error) {
		console.error('Error en query2:', error);
		throw error;
	}
	*/
}

export const db = {
	getPosts,
	getPostById,
	storePost,
	storeEditPost,
	deletePostById,
	getCategorias,
	storePostCategoria,
	getPostCategoria
}