import { db } from './index.js'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

import { middlewares } from '../auth/index.js'


// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const login = (req, res) => {

    let msg = ""
    console.log('req.query', req.query)
    if(req.query.msg){
        if(req.query.msg == 'ok'){
            msg = 'Usuario generado correctamente'
        }
    }else{
        if(req.query.err == 'usrnoenc'){
            msg = 'revise los datos ingresados y vuelva a intentarlo'
        }
    }

    //const obj = {msg: msg, isLogin: 'ok'}
    console.log('zz-->', msg)
    console.log('zz-->', req.isAuthenticated)

    try {
        //const result2 = await db.getUsers();
        console.log('___login'); 

        res.render('login', {msg: msg, isLogin: req.isAuthenticated} )    

    	
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
}

const logout = (req, res) => {
    console.log('___iniciologout');
    res
        .cookie('token', '')
        .cookie('user', 0)

    try {
        //const result2 = await db.getUsers();
        console.log('___logout'); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
}

const register = (req, res) => {

    try {
        //const result2 = await db.getUsers();
        console.log('___register'); 
    	res.render('register')
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const controllers = {
	login,
	register
}

