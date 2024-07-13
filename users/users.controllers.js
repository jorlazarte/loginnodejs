import { db } from './index.js'
import { middlewares } from '../auth/index.js'


import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';


// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const getUsers = async (req, res) => {
	/*
	console.log('getUsers')
	//const [result] = await db.getUsers()
	const result2 = await db.getUsers()
	//console.log('getUsers:', result2)
	console.log('___fin getUsers')
	res.render('./pages/users');
	*/

    try {
        const result2 = await db.getUsers();
        console.log('___fin getUsers', middlewares.isLogin);

        // Renderizar la vista index.html y pasar los datos obtenidos
        //res.json({ users: result2 });
        //res.sendFile(path.join(__dirname, '../pages', 'users.html'));
    	//res.render('index')
    	//res.send(result2) 
    	res.render('users', { isLogin: req.isAuthenticated, users: result2, route: 'http://'+req.headers.host })
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
}

const editUser = async (req, res) => {

	const idUser = req.params.id;
    
    const result2 = await db.getUserById(idUser)
    const result3 = await db.getRoles()
    console.log('--xeditUser', result2)
    console.log('--xeditUser', result2[0])
	res.render('user', { action: 'update', isLogin: req.isAuthenticated, user: result2[0], roles: result3[0]})
}


const getUserById = async (req, res) => {
	console.log('getUserById')
	//const [result] = await db.getUsers()
	const result2 = await db.getUserById()
	console.log('getUserById:', result2)
	//console.log(res.json(result2))

}

const storeEditUser = async (req, res, next) => {

	console.log('storeEditUser', req.body)
	let messageRes = 'ERROR'
	
	
	const { id, name, username, email, type } = req.body
	
	const user = {id, name, username, email, type}
	
	//console.log('controlador: storeEditPost', post)
	
	const result2  = await db.storeEditUser(user)
	
	console.log('controlador storeEditUser: result2', result2)
	console.log('controlador: storePost affectedRows', result2.affectedRows)

	if ( result2.affectedRows === 1)
		messageRes = 'OK'

	//return result2
	
	const result3 = await db.getUsers()

	res.render('users', { users: result3, isLogin: req.isAuthenticated, message: messageRes, route: 'http://'+req.headers.host+'/users/edit/' })
	
	//res.send('storeEditUser')
}

export const controllers = {
	getUsers,
	getUserById,
	editUser,
	storeEditUser
}

