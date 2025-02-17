/* 
    Rutas de W / Events
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { fieldValidators } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')


const router = Router();

// Any request must have its own JWT
router.use(validateJWT);

// Obtener eventos
router.get(
    '/',
    getEvents
);

// Create new event
router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        fieldValidators
    ],
    createEvent
);

// Update  event
router.put(
    '/:id',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        fieldValidators
    ],
    updateEvent
);

// Delete  event
router.delete(
    '/:id',
    deleteEvent
);


module.exports = router;