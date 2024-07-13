import jwt from 'jsonwebtoken'
import { config } from './index.js'

import {fileURLToPath} from 'url'
import path from 'path'


const __dirname = path.dirname(fileURLToPath(import.meta.url))

function authJWT(req, res, next) {

    // El prefijo "Bearer" indica que se está enviando un token de tipo JWT.
    // Al utilizar cookies no necesitamos separar el string con Bearer
    const token = req.signedCookies.token
    const auth = req.cookies.token
    
    console.log('token', token)
    console.log('auth', auth)



    if (!token) return res
        .status(403)
        //.send('Hace falta autorización')
        .redirect('/login')

    jwt.verify(token, config.secretKey, (err, decoded) => {

        if (err)
            return res
                .status(500)
                //.send('El token ha expirado')
                .redirect('/login')

        // iat: IssuedAtTime: Fecha de creación del token
        // exp: Fecha de expiración del token
        console.log(decoded)

        next()
    })
}

function isLogin(req, res, next){
    const token = req.signedCookies.token;

    if (!token) {
        req.isAuthenticated = false;
        return next();
    }

    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            req.isAuthenticated = false;
        } else {
            req.isAuthenticated = true;
        }
        next();
    });
    
}

function validateRegister(req, res, next){
    const { email, username, apellidoynombre, password } = req.body
    const regUser = { email, username, apellidoynombre, password }
    
    if (!email || !username || !password) {
        console.log('message', 'Todos los campos son obligatorios')
        res.redirect('../register?err=')
    }
    /*
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return res.status(400).render('create-user', { message: 'Correo electrónico inválido' });
    }

    if (password.length < 6) {
    return res.status(400).render('create-user', { message: 'La contraseña debe tener al menos 6 caracteres' });
    }
    */
    /*
    if (1 == 1) 
        return res
        .status(403)
        .send('MAL REGISTRACION')
    */
}


export const middlewares = { authJWT, validateRegister, isLogin }