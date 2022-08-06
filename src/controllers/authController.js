const { Psicologos } = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const secret = require('../config/secret');


const AuthController = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
    
            const psicologo = await Psicologos.findOne({
                where: {
                    email
                }
            });
            
    
            if(!psicologo || !bcrypt.compareSync(senha, psicologo.senha)) {
                return res.status(401).json('E-mail ou senha inválido, verifique e tente novamente');
            }
    
            const token = jwt.sign(
                {
                    id: psicologo.id,
                    email: psicologo.email,
                    nome: psicologo.nome
                },
                secret.key
            )
    
            return res.status(200).json(token);
        } catch (error) {
            res.status(500).json('Falha no processamento da requisição');
        }
    }
}

module.exports = AuthController