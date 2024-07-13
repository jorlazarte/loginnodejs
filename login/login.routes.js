import { Router } from 'express'
import { controllers } from './index.js'

/*exporto router
entonces cuando importe va a venir con la configuración de ambos post login y register*/
export const routes = Router()

routes.get('/register', controllers.register)
routes.get('/', controllers.login)

