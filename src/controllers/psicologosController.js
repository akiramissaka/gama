const { Psicologos } = require("../models");
const bcrypt = require('bcryptjs');

const PsicologosController = {
    async listarTodos (req, res) {
        try {
            const listaDePsicologos = await Psicologos.findAll();
            res.status(200).json(listaDePsicologos);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
        
    },
    async listarPeloId (req, res) {
        try {
            const { id } = req.params;
            const psicologo = await Psicologos.findByPk(id);

            if(!psicologo) return res.status(404).json('Id não encontrado')

            res.status(200).json(psicologo);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
    },
    async registro(req, res) {
        try {
            const { nome, email, senha, apresentacao } = req.body;
    
            const newSenha = bcrypt.hashSync(senha, 10);
            const newPsicologo = await Psicologos.create({nome, email, senha: newSenha, apresentacao});
    
            return res.status(201).json(newPsicologo);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
    },
    async atualizar (req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha, apresentacao } = req.body;
            console.log('senha update', senha)
    
            if(!id) {
                return res.status(404).json('id não encontrado')
            }

            const psicologo = await Psicologos.findByPk(id);

            if(!psicologo){
                return res.status(404).json('id não encontrado');
            }

            const newSenha = bcrypt.hashSync(senha, 10);
            console.log('newSenha', newSenha)
            const updateResult = await Psicologos.update(
                {
                    nome, 
                    email, 
                    senha: newSenha, 
                    apresentacao
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
                const psicologoAtualizado = await Psicologos.findByPk(id);
                return res.status(200).json(psicologoAtualizado);
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

            const psicologo = await Psicologos.findByPk(id);

            if(!psicologo){
                return res.status(404).json('id não encontrado');
            }

            await Psicologos.destroy({
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

module.exports = PsicologosController