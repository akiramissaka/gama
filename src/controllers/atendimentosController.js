const { Atendimentos, Psicologos } = require("../models");
const bcrypt = require('bcryptjs');

const AtendimentosController = {
    async listarTodos (req, res) {
        try {
            const listaDeAtendimentos = await Atendimentos.findAll({
                include: [Psicologos] 
            });
            res.status(200).json(listaDeAtendimentos);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
        
    },
    async listarPeloId (req, res) {
        try {
            const { id } = req.params;
            const atendimento = await Atendimentos.findByPk(id, {
                include: [Psicologos] 
            });

            if(!atendimento) return res.status(404).json('Id não encontrado')

            res.status(200).json(atendimento);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
    },
    async registro(req, res) {
        try {
            const { data_atendimento, paciente_id, observacao } = req.body;
            const { id: psicologo_id } = req.auth;

            console.log('req.auth', req.auth)
    
            const newAtendimento = await Atendimentos.create({
                data_atendimento, 
                paciente_id,
                psicologo_id,
                observacao
            });
    
            return res.status(201).json(newAtendimento);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
    },
    async atualizar (req, res) {
        try {
            const { id } = req.params;
            const { data_atendimento, paciente_id, observacao } = req.body;
            const { id: psicologo_id } = req.auth;

            if(!id) {
                return res.status(404).json('Id não encontrado')
            }

            const atendimento = await Atendimentos.findByPk(id);

            if(!atendimento){
                return res.status(404).json('id não encontrado');
            }

            const updateResult = await Atendimentos.update(
                {
                    data_atendimento, 
                    paciente_id,
                    psicologo_id,
                    observacao
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
                const atendimentoAtualizado = await Atendimentos.findByPk(id);
                res.status(200).json(atendimentoAtualizado);
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

            const atendimento = await Atendimentos.findByPk(id);

            if(!atendimento){
                return res.status(404).json('id não encontrado');
            }

            await Atendimentos.destroy({
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

module.exports = AtendimentosController