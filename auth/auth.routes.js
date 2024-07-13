import { Router } from 'express'
import { controllers } from './index.js'
import { validateUser } from '../middlewares/validation.middleware.js';

import { middlewares } from '../auth/index.js'

/*exporto router
entonces cuando importe va a venir con la configuración de ambos post login y register*/
export const routes = Router()

routes.post('/login', controllers.login )
routes.post('/register', validateUser, controllers.register )