const express = require('express');
const { listarContasBancarias } = require('./controladores/contasBancarias');

const rotas = express();

rotas.get('/contas', listarContasBancarias)

module.exports = { rotas }