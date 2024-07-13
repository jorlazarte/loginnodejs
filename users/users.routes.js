import { Router } from 'express'
import { controllers } from './index.js'
import { middlewares } from '../auth/index.js'

/*exporto router
entonces cuando importe va a venir con la configuración de ambos post login y register*/
export const routes = Router()

routes.get('/', middlewares.authJWT, controllers.getUsers)
routes.get('/:id', controllers.getUserById)
routes.get('/edit/:id', controllers.editUser)
routes.put('/edit/:id', controllers.storeEditUser)