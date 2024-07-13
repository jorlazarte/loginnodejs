import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres'),
  body('email')
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    	//res.redirect('../register?err=rev')
      	//return res.status(400).json({ errors: errors.array() });
      	//res.render('register', {  })
      	const errLst = errors.array()
      	
      	//console.log( errors.array() )
      	//console.log( errLst[0].msg )
      	//res.render('register', {isLogin: req.isAuthenticated, err: errors.array()} )
      	res.redirect('../register?err=rev')
      	//returns false;
    }else{
    	next();	
    }
    
  }
];
