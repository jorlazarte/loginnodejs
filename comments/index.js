//import {} from './auth/auth.config.js'
//import {} from './auth/auth.middleware.js'
export { db } from './comments.dao.memory.js' 	/* EXPORTO DE AUTH CONTROLLERS PARA RECIBIR EN app.js*/
export { controllers } from './comments.controllers.js' 	/* EXPORTO DE AUTH CONTROLLERS PARA RECIBIR EN app.js*/
export { routes as commentsRoutes } from './comments.routes.js'	/* EXPORTO DE AUTH ROUTES PARA RECIBIR EN app.js*/