import { db } from './index.js'
import { messages } from "./comments.data.js"

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const getComments = async (req, res) => {
	console.log('getComments')

	const result2 = await db.getComments()
	res.render('comments', { comments: result2, message: '', route: 'comments/edit/' })
}

const createComment = (req, res) => {

	const { title, text, userid } = req.body
	const result2 = [{'title': '', textComment: ''}]
	console.log('--createComment', req.cookies.user)
	res.render('comment', { action: 'create', idUser: req.cookies.user, idComment: 0, comment: result2 })
}

const storeComment = async (req, res) => {

	const { commentIdUser, commentTitle, commentBody } = req.body
	
	const comment = {commentIdUser, commentTitle, commentBody}

	let messageRes = 'ERROR'

	console.log('controlador: storeComment', comment)
	//res.send(comment)
	const result2 = await db.storeComment(comment)
	console.log('controlador: result2', result2)
	console.log('controlador: storeComment affectedRows', result2.affectedRows)

	if ( result2.affectedRows === 1)
		messageRes = 'OK'

	const result3 = await db.getComments()

	res.render('comments', { comments: result3, message: messageRes, route: 'edit/' })
	//const result2 = await db.storeComment(comment)
}

const editComment = async (req, res) => {

	const idComment = req.params.id;
    
    const result2 = await db.getCommentById(idComment)
    console.log('--editComment', result2)
	res.render('comment', { action: 'update', idUser: req.cookies.user, idComment: idComment, comment: result2 })
}

const storeEditComment = async (req, res, next) => {

	console.log('req.body', req.body)
	let messageRes = 'ERROR'
	/*
	let {idComment, idUser, titleComment, textComment} = req.body

	const comment = {idComment, idUser, titleComment, textComment}
	//console.lo
	//const commentUpdate = comment
	*/
	const { commentId, commentIdUser, commentTitle, commentBody } = req.body
	
	const comment = {commentId, commentIdUser, commentTitle, commentBody}
	
	console.log('controlador: storeEditComment', comment)
	
	const [result2]  = await db.storeEditComment(comment)
	
	console.log('controlador: result2', result2)
	console.log('controlador: storeComment affectedRows', result2.affectedRows)

	if ( result2.affectedRows === 1)
		messageRes = 'OK'

	//return result2
	
	const result3 = await db.getComments()

	res.render('comments', { comments: result3, message: messageRes, route: '' })
	
}

export const controllers = {
	getComments,
	createComment,
	storeComment,
	editComment,
	storeEditComment
}