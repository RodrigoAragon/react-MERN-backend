const {Router} = require('express')
const { eliminarEvento, actualizarEvento, crearEvento, getEventos } = require("../controllers/events")
const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')

const router = Router()

///Todas tienen que pasar por la validación del token
router.use(validarJWT)

///Obtener eventos
router.get('/', getEventos)

///Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento)


///Actualizar un evento
router.put('/:id', actualizarEvento)


///Eliminar evento
router.delete('/:id', eliminarEvento)

module.exports = router