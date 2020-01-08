const express = require('express')
const router = express.Router()
const unidadesController = require('../controllers/unidades')

const Unidade = require('../models/Unidade')

const models = {
  Unidade
}

router.get('/', unidadesController.home.bind(null, models))

router.get('/todas', unidadesController.todasUnidades.bind(null, models))

router.get('/pendencias/:grupo/termo/pendente', unidadesController.unidadeComPendenciaTermo.bind(null, models))
router.get('/pendencias/:grupo/termo/ok', unidadesController.unidadeSemPendenciaTermo.bind(null, models))

router.get('/pendencias/:grupo/bens/pendente', unidadesController.unidadesComPendenciaBens.bind(null, models))
router.get('/pendencias/:grupo/bens/ok', unidadesController.unidadeSemPendenciaBens.bind(null, models))

router.get('/grupos/:grupo', unidadesController.grupos.bind(null, models))

router.get('/nova', unidadesController.novaForm.bind(null, models))
router.post('/nova', unidadesController.novaProcess.bind(null, models))

router.get('/excluir/:id', unidadesController.excluir.bind(null, models))

router.get('/editar/:id', unidadesController.editarForm.bind(null, models))
router.post('/editar/:id', unidadesController.editarProcess.bind(null, models))

router.get('/info/:id', unidadesController.info.bind(null, models))
router.post('/info/:id', unidadesController.addComentario.bind(null, models))


module.exports = router