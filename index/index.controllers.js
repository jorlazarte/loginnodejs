import { db } from './index.js'
import { messages } from "./index.data.js"

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

	res.render('index', {isLogin: req.isAuthenticated, posts: result2, message: '', route: 'http://'+req.headers.host})
}



export const controllers = {
	getPosts
}