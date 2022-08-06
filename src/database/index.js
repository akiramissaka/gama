const Sequelize = require('sequelize');

const DB_NAME = 'desafio_gama';
const DB_User = 'root';
const DB_PASS = '654321';
const DB_CONFIG = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
};

let db = {}

try {
    db = new Sequelize(DB_NAME, DB_User, DB_PASS, DB_CONFIG);
    
} catch (error) {
    console.error('Erro ao instanciar o ORM', error);
}

async function hasConnection() {
    try {
        await db.authenticate();
    } catch (error) {
        console.error('Erro ao tentar se conectar ao banco de dados', error);
    }
}

Object.assign(db, {
    hasConnection
});

module.exports = db;