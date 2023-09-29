const express = require('express');
const { listarContasBancarias, criarContaBancaria, atualizarUsuario, excluirConta } = require('./controladores/contasBancarias');
const { depositar, listarDepositos, sacar, listarSaques } = require('./controladores/transacoes');

const rotas = express();

rotas.get('/contas', listarContasBancarias);
rotas.post('/contas', criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta)

rotas.post('/transacoes/depositar', depositar)
rotas.get('/depositos', listarDepositos);
rotas.post('/transacoes/sacar', sacar)
rotas.get('/saques', listarSaques);

module.exports = { rotas }