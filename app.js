import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import {fileURLToPath} from 'url'

import methodOverride from 'method-override'
import dotenv from 'dotenv' 

import { middlewares } from './auth/index.js'
import { authRoutes, config } from './auth/index.js'
import { usersRoutes } from './users/index.js'
import { loginRoutes } from './login/index.js'
import { postsRoutes } from './posts/index.js'
import { indexRoutes } from './index/index.js'
import { commentsRoutes } from './comments/index.js'

//npm i express-ejs-layouts
import layouts from 'express-ejs-layouts' //para hacer un layouts de todo lo que se repite

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use( express.urlencoded( {extended: true} ) )
app.use( express.json() )

app.use(methodOverride('_method'));

app.set('view engine', 'ejs'); //configuramos el motor de vistas ejs
app.set('views', path.join(__dirname, 'views') ); //ruta absoluta donde van a estar las vistas
app.use(layouts); //uso el layout declarado en la línea 11
app.set('layout', 'layouts/layout'); //seteo donde va a estar el layout

app.use(cookieParser(config.secretKey))
app.use(express.static( path.join(__dirname, 'public') ))
//app.use(express.static( path.join(__dirname, 'public/js') ))

app.listen(PORT, () => {
	console.clear()
	console.log('__dirname', __dirname)
	console.log('-->', import.meta.url)
	console.log(`Escuchando: http://localhost:${PORT}`)

})

// parsear cookies
app.use(cookieParser(config.secretKey)); // Cambia 'your_secret_key' por tu clave secreta

// verifico el login
app.use(middlewares.isLogin);


app.get('/logout', (req, res) => {
	console.log('___iniciologout')

    res
        .cookie('token', '')
        .cookie('user', 0)
    console.log('___finlogout')

    res.redirect('/login')
} ) 

app.use( '/register', (req, res) => {
	res.render('register', {isLogin: req.isAuthenticated, err: ''} )
} )
app.use( '/login', loginRoutes )

app.use( '/auth', authRoutes )
app.use( '/users', middlewares.authJWT, usersRoutes )
app.use( '/posts', postsRoutes )
//app.use( '/comments', commentsRoutes )

app.use( '/', indexRoutes )