export { config } from '../auth/auth.config.js'
export { middlewares } from '../auth/auth.middleware.js'
export { db } from './users.dao.memory.js' 	/* EXPORTO DE AUTH CONTROLLERS PARA RECIBIR EN app.js*/
export { controllers } from './users.controllers.js' 	/* EXPORTO DE AUTH CONTROLLERS PARA RECIBIR EN app.js*/
export { routes as usersRoutes } from './users.routes.js'	/* EXPORTO DE AUTH ROUTES PARA RECIBIR EN app.js*/