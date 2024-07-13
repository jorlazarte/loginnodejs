import { db } from './index.js'
import { messages } from "./posts.data.js"

import { adapters } from "./posts.adapter.js"

import url from 'url'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

import fs from 'fs'

import pathDir from 'path'
const __dirname = pathDir.dirname(fileURLToPath(import.meta.url))

const getPosts = async (req, res) => {
	console.log('getPosts')
	//var url_parts = url.parse(req.url);
	//console.log('*****', url_parts);
	console.log('**99***', req.headers.host);
	
	const result2 = await db.getPosts()

	res.render('posts', {isLogin: req.isAuthenticated, posts: result2, message: '', route: 'http://'+req.headers.host})
}

const createPost = async (req, res) => {	
	const { title, text, userid } = req.body
	const result2 = [{'title': '', textPost: ''}]
	console.log('--createPost', req.cookies.user)

	const result3 = await db.getCategorias()

	res.render('post', { action: 'create', isLogin: req.isAuthenticated, idUser: req.cookies.user, idPost: 0, post: result2, cats: result3 })
	
}

const storePost = async (req, res) => {
	let messageRes = 'ERROR'
	let iTotCat = 0
	let iTotReg = 0
	try {
		console.log('storePost -> req.file', req.file);
		const post = adapters.postAdapter(req.body, req.file)
		console.log('post final', post)
		
		const result2 = await db.storePost(post)
		console.log('controlador: result2', result2)

		const idInst = result2.insertId

		console.log('controlador: id ingresado nuevo', idInst)
		console.log('controlador: storePost affectedRows', result2.affectedRows)
		
		const lstCat = post.postCategorias
		let result4

		lstCat.forEach( async function(cat) {
		    result4 = await db.storePostCategoria(idInst, cat) 
		    console.log('controlador: result4affectedRows', result4[0].affectedRows)
		    
		    iTotCat = iTotCat + 1
		    iTotReg = parseInt(iTotReg) + parseInt(result4[0].affectedRows)

		    console.log('iTotCat:', iTotCat, 'iTotReg grabados:', iTotReg)
			
		});
		
		
		if ( result2.affectedRows === 1 && iTotCat == iTotReg)
			messageRes = 'OK'
		
		const result3 = await db.getPosts()
		res.render('posts', { posts: result3, isLogin: req.isAuthenticated, message: messageRes, route: 'http://'+req.headers.host+'/posts/create' })
		
	} catch (error) {
		console.error('Error en storePost:', error);
		res.status(500).send('Error al subir el archivo');
	}

	
	//console.log('adapters: ', post)
	
	/*
	const { postIdUser, postTitle, postBody, image } = req.body
	
	const postSend = {postIdUser, postTitle, postBody, image}

	let messageRes = 'ERROR'

	console.log('controlador: storePost', postSend)
	//res.send(post)
	
	const result2 = await db.storePost(postSend)
	console.log('controlador: result2', result2)
	console.log('controlador: storePost affectedRows', result2.affectedRows)

	if ( result2.affectedRows === 1)
		messageRes = 'OK'

	const result3 = await db.getPosts()

	res.render('posts', { posts: result3, isLogin: req.isAuthenticated, message: messageRes, route: 'http://'+req.headers.host+'/posts/create' })
	//const result2 = await db.storePost(post)
	*/
}

const editPost = async (req, res) => {

	const idPost = req.params.id;
    
    const result2 = await db.getPostById(idPost)
    const result3 = await db.getPostCategoria(idPost)

    console.log('result2', result2)
    console.log('result3', result3)
    console.log('result3', result3)
	//res.send(result2)
	//res.send(lstCat)
	res.render('post', { action: 'update', isLogin: req.isAuthenticated, idUser: req.cookies.user, idPost: idPost, post: result2 , cats: result3 })
}

const storeEditPost = async (req, res, next) => {
	console.log('**********storeEditPost**********')
	console.log('req.body', req.body)
	let messageRes = 'ERROR'

	console.log('storeEditPost -> req.file', req.file);
	const post = adapters.postAdapter(req.body, req.file)
	console.log('storeEditPost_post final', post)

	const [result2]  = await db.storeEditPost(post)
	if ( result2.affectedRows === 1){
		messageRes = 'OK'
		console.log('post.postArchAnt', path.join(__dirname, '../public'), post.postArchAnt)
		
		if(post.postArchAnt != '' )
			fs.unlinkSync(path.join(__dirname, '../public', post.postArchAnt));
		//console.log
	}

	const result3 = await db.getPosts()
	res.render('posts', { posts: result3, isLogin: req.isAuthenticated, message: messageRes, route: 'http://'+req.headers.host+'/posts/create' })
	
}

const deletePost = async (req, res) => {
	console.log('--deletePost', req.params)
	const idPost = req.params.id;
    let messageRes = 'ERROR'
    const result2 = await db.deletePostById(idPost)
    console.log('--deletePost', idPost)

    if ( result2.affectedRows === 1)
		messageRes = 'OK'
	
	const result3 = await db.getPosts()

	res.render('posts', { posts: result3, isLogin: req.isAuthenticated, message: messageRes, route: 'http://'+req.headers.host+'/posts/create' })
}

export const controllers = {
	getPosts,
	createPost,
	storePost,
	editPost,
	storeEditPost,
	deletePost,
}