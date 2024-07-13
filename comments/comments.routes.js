import { Router } from 'express'
import { controllers } from './index.js'
import { middlewares } from '../auth/index.js'

/*exporto router
entonces cuando importe va a venir con la configuración de ambos post login y register*/
export const routes = Router()

console.log('Comments routes')
routes.get('/',  controllers.getComments)
routes.get('/create', controllers.createComment )
routes.post('/create', controllers.storeComment )
routes.get('/edit/:id', controllers.editComment )
routes.put('/edit/:id', controllers.storeEditComment )
