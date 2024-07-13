export { config } from '../auth/auth.config.js'
export { middlewares } from '../auth/auth.middleware.js'
export { db } from './login.dao.memory.js' 	/* EXPORTO DE AUTH CONTROLLERS PARA RECIBIR EN app.js*/
export { controllers } from './login.controllers.js' 	/* EXPORTO DE AUTH CONTROLLERS PARA RECIBIR EN app.js*/
export { routes as loginRoutes } from './login.routes.js'	/* EXPORTO DE AUTH ROUTES PARA RECIBIR EN app.js*/