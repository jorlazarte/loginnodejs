import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { config } from '../auth/index.js'
import { db } from '../users/index.js'

import url from 'url'

const register = async (req, res) => {
	const { email, password, username, apellidoynombre } = req.body

	console.log("register--req.body", req.body)
	
	const hash = bcrypt.hashSync(password, 10)

    const user = { email, password: hash, username, apellidoynombre, type: 1 }

    console.log("register--user", user)
    
    
	const result = await db.storeUser(user)

	console.log("register__result", result)

	if(result){
		
		//res.render('login', {message: 'usuario ' + username + ' generado correctamente'})

		    res.redirect(url.format({
		       pathname:"../login",
		       query: {
		       		"msg": "ok"
		        }
		     }));


	}else{
		    res.redirect(url.format({
		       pathname:"../login",
		       query: {
		       		"msg": "registracion error"
		        }
		     }));
	}
}

const login = async (req, res) => {
	const { email, password } = req.body
	const isValid = false

	try {
		console.log('login - contrasenia ingresada:', password)
		//const [result1, result2] = await Promise.all( [db.getUserByName(username), db.getUserByName('juan')] );
		const result1 = await db.getUserByEmail(email)
		console.log('en el login:', result1)
		
		let isValid = false

		if (result1.length > 0) {
			const passwordDB = result1[0].password;
			console.log('login - contrasenia del usuario enviado:', passwordDB)

			console.log('login - comparacion password db', passwordDB, 'y password enviada en login', password)
			isValid = bcrypt.compareSync(password, passwordDB)
			console.log('login - valida contrasenia', isValid)
		}else{
			console.log('login - USUARIO NO ENCONTRADO')
		}

		console.log(Boolean(isValid) == Boolean(true))
		console.log(isValid === true)

		if(isValid){

		}else{ 
	    	return res
	        	.status(404)
	        	//.json({ error: true, desc: 'Invalid password', valido: isValid })
	        	.redirect('/login?err=usrnoenc')
	    }


	    const signature = config.secretKey
	    const payload = { id: result1[0].id, username: result1[0].username }

	    const token = jwt.sign(payload, signature, config.token)

	    console.log('*******************')
	    console.log('signature', signature)
	    console.log('user.id', result1[0].id)
	    console.log('user.username', result1.username)
	    console.log('payload', payload)
	    console.log('token generado', token)
	    console.log('config.cookie', config.cookie)
	    console.log('*******************')

		res
	        .status(200)
	        .set('authorization', `Bearer ${token}`)
	        .cookie('token', token, config.cookie)
	        .cookie('user', result1[0].id)
	        .redirect('/index')

	} catch (error) {
		console.error('Error al obtener los datos:', error);
		res.redirect('/login')
	}
}

export const controllers = {
	register,
	login
}

