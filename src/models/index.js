const Atendimentos = require("./Atendimentos");
const Pacientes = require("./Pacientes");
const Psicologos = require("./Psicologos");


Atendimentos.belongsTo(Pacientes, {
    foreignKey: 'paciente_id'
});

Atendimentos.belongsTo(Psicologos, {
    foreignKey: 'psicologo_id'
});

Pacientes.hasMany(Atendimentos, {
    foreignKey: 'paciente_id'
});

Psicologos.hasMany(Atendimentos, {
    foreignKey: 'psicologo_id'
});

module.exports = {
    Atendimentos,
    Pacientes,
    Psicologos
}


/* const CategoriaProduto = require('./CategoriaProduto');
const Categorias = require('./Categorias');
const Fabricantes = require('./Fabricantes');
const Produtos = require('./Produtos');
const Usuarios = require('./Usuarios');

Produtos.belongsTo(Fabricantes, {
    foreignKey: 'fabricante_id'
});

Fabricantes.hasMany(Produtos, {
    foreignKey: 'fabricante_id'
});

Produtos.belongsToMany(Categorias, {
    foreignKey: 'produto_id',
    through: CategoriaProduto
})

Categorias.belongsToMany(Produtos, {
    foreignKey: 'categoria_id',
    through: CategoriaProduto
});

module.exports = {
    Fabricantes,
    Produtos,
    Categorias,
    Usuarios
} */