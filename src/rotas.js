const express = require('express');
const { listarContasBancarias, criarContaBancaria, atualizarUsuario } = require('./controladores/contasBancarias');

const rotas = express();

rotas.get('/contas', listarContasBancarias);
rotas.post('/contas', criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario)

module.exports = { rotas }