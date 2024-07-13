import { Router } from 'express'
import { controllers } from './index.js'
import { middlewares } from '../auth/index.js'

/*exporto router
entonces cuando importe va a venir con la configuración de ambos post login y register*/
export const routes = Router()

console.log('blogs routes')
routes.get('/',  controllers.getBlogs)
routes.get('/create', controllers.createBlog )
routes.post('/create', controllers.storeBlog )