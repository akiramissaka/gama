const express = require('express');
const authController = require('../controllers/authController');
const authLoginValidation = require('../validations/auth/login');
const auth = require('../middlewares/auth');
const psicologosController = require('../controllers/psicologosController');
const pacientesController = require('../controllers/pacientesController');
const atendimentosController = require('../controllers/atendimentosController');
const routes = express.Router();

const psicologosCreateValidation = require('../validations/psicologos/create');
const pacientesCreateValidation = require('../validations/pacientes/create');
const atendimentosCreateValidation = require('../validations/atendimentos/create');


routes.get('/', (req, res) => {
    res.send('olá mundo');
});


routes.post('/login', authLoginValidation, authController.login);

routes.get('/psicologos/:id', psicologosController.listarPeloId);
routes.get('/psicologos', psicologosController.listarTodos);
routes.post('/psicologos', psicologosCreateValidation, psicologosController.registro);
routes.put('/psicologos/:id', psicologosCreateValidation, psicologosController.atualizar);
routes.delete('/psicologos/:id', psicologosController.deletar);

routes.get('/pacientes/:id', pacientesController.listarPeloId);
routes.get('/pacientes', pacientesController.listarTodos);
routes.post('/pacientes', pacientesCreateValidation, pacientesController.registro);
routes.put('/pacientes/:id', pacientesCreateValidation, pacientesController.atualizar);
routes.delete('/pacientes/:id', pacientesController.deletar);

routes.get('/atendimentos/:id', auth, atendimentosController.listarPeloId);
routes.get('/atendimentos', auth, atendimentosController.listarTodos);
routes.post('/atendimentos', auth, atendimentosCreateValidation, atendimentosController.registro);
routes.put('/atendimentos/:id', auth, atendimentosCreateValidation, atendimentosController.atualizar);
routes.delete('/atendimentos/:id', auth, atendimentosController.deletar);



module.exports = routes;