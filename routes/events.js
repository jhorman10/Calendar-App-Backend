/**
 * Rutas de eventos
 * host + /api/events
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/fieldValidators');
const { validateJWT } = require('../middlewares/validateJWT');
const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = new Router();

router.use(validateJWT);

//Obtener eventos
router.get('/', getEvent);

//Crear un evento
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    fieldValidators,
  ],
  createEvent
);

//Actualizar evento
router.put(
  '/:id',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    fieldValidators,
  ],
  updateEvent
);

//Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;
