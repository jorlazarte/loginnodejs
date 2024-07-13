import { Router } from 'express'
import { controllers } from './index.js'
import { middlewares } from '../auth/index.js'

import { middleware1 } from '../middlewares/index.js'

import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
/*exporto router
entonces cuando importe va a venir con la configuración de ambos post login y register*/
export const routes = Router()

/******************************************
para utilizar el método single con el atributo name del archivo
middleware1 -> viene de acá: import { middleware1 } from '../middlewares/index.js'
de ahí voy a '../middlewares/index.js' y tengo import { middlewareFiles as files } from "../files/files.middlewares.js";
entonces de ahí saco files y de ahí me voy a "../files/files.middlewares.js"
y de ese archivo sale uploadImage...
entonces queda middleware1.files.uploadImage.single('image')
******************************************/
console.log('Posts routes')
routes.get('/',  controllers.getPosts)
routes.get('/create', controllers.createPost )
routes.post('/create', middleware1.files.uploadImage.single('image'), controllers.storePost )
routes.get('/edit/:id', controllers.editPost )
routes.put('/edit/:id', middleware1.files.uploadImage.single('image'), controllers.storeEditPost )
routes.delete('/delete/:id', controllers.deletePost )
