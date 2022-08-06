const express = require('express');
const routes = require('./routes');

const db = require('./database');
const handlError = require('./middlewares/handlError');

const app = express();

db.hasConnection();

app.use(express.json());
app.use(routes);
app.use(handlError);

app.listen(3000,  () => {
    console.log('servidor rodando na porta 3000');
})