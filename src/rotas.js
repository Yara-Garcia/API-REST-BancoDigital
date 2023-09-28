const express = require('express');
const { listarContasBancarias, criarContaBancaria } = require('./controladores/contasBancarias');

const rotas = express();

rotas.get('/contas', listarContasBancarias);
rotas.post('/contas', criarContaBancaria)

module.exports = { rotas }