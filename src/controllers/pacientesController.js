const { Pacientes } = require("../models");
const bcrypt = require('bcryptjs');

const PacientesController = {
    async listarTodos (req, res) {
        try {
            const listaDePacientes = await Pacientes.findAll();
            res.status(200).json(listaDePacientes);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
        
    },
    async listarPeloId (req, res) {
        try {
            const { id } = req.params;
            const paciente = await Pacientes.findByPk(id);

            if(!paciente) return res.status(404).json('Id não encontrado')

            res.status(200).json(paciente);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
    },
    async registro(req, res) {
        try {
            const { nome, email, idade } = req.body;
    
            const newPaciente = await Pacientes.create({nome, email, idade});
    
            return res.status(201).json(newPaciente);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
    },
    async atualizar (req, res) {
        try {
            const { id } = req.params;
            const { nome, email, idade } = req.body;
    
            if(!id) {
                return res.status(404).json('Id não encontrado')
            }

            const paciente = await Pacientes.findByPk(id);

            if(!paciente){
                return res.status(404).json('id não encontrado');
            }

            const updateResult = await Pacientes.update(
                {
                    nome, 
                    email, 
                    idade
                },
                {
                    where: {
                        id
                    }
                }
            );

            console.log('updateResult', updateResult)
            //const hasUpdated = updateResult[0] > 0;
            //if(hasUpdated){
                const pacienteAtualizado = await Pacientes.findByPk(id);
                res.status(200).json(pacienteAtualizado);
            //}
            //res.status(500).json('Falha no processamento da requisição');
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
    },
    async deletar (req, res) {
        try {
            const { id } = req.params;
            
            if(!id) return res.status(404).json('id inválido')

            const paciente = await Pacientes.findByPk(id);

            if(!paciente){
                return res.status(404).json('id não encontrado');
            }

            await Pacientes.destroy({
                where: {
                    id
                }
            });
    
            res.status(204).json();
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
    },
};

module.exports = PacientesController