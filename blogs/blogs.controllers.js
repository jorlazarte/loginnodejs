import { db } from './index.js'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const getBlogs = async (req, res) => {
	console.log('getBlogs')
	res.render('blogs', { blogs: 'hola' })
	//res.render('index');
	/*
	//const [result] = await db.getUsers()
	const result2 = await db.getUsers()
	console.log('getUsers:', result2)
	console.log(res.json(result2))
	*/
}

const createBlog = (req, res) => {

	const { title, text, userid } = req.body

	console.log('--createBlog', req.cookies.user)
	res.render('blog', { id: req.cookies.user })
}

const storeBlog = async (req, res) => {

	const { userid, title, text } = req.body
	
	console.log('storeBlog', userid, title, text)
	/*
    try {
        const result2 = await db.storeBlog();
        //console.log('___fin getUsers');

        // Renderizar la vista index.html y pasar los datos obtenidos
        //res.json({ users: result2 });
        //res.sendFile(path.join(__dirname, '../pages', 'users.html'));
    	//res.render('index')
    	//res.send(result2) 
    	//res.render('users', { users: result2 })
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Internal Server Error');
    }
    */
	
}

export const controllers = {
	getBlogs,
	createBlog,
	storeBlog
}