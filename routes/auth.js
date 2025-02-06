/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/field-validators');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth')
const { validateJWT } = require('../middlewares/validate-jwt')


const router = Router();


router.post(
    '/new',
    [ // Middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be 6 characters long').isLength({ min: 6 }),
        fieldValidators
    ],
    createUser
);

router.post(
    '/',
    [ // Middlewares
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be 6 characters long').isLength({ min: 6 }),
        fieldValidators
    ]
    ,
    loginUser
);

router.get('/renew', validateJWT, revalidateToken);




module.exports = router;