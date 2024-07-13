//import {} from './auth/auth.config.js'
//import {} from './auth/auth.middleware.js'
export { db } from './posts.dao.memory.js' 	/* EXPORTO DE AUTH CONTROLLERS PARA RECIBIR EN app.js*/
export { controllers } from './posts.controllers.js' 	/* EXPORTO DE AUTH CONTROLLERS PARA RECIBIR EN app.js*/
export { routes as postsRoutes } from './posts.routes.js'	/* EXPORTO DE AUTH ROUTES PARA RECIBIR EN app.js*/