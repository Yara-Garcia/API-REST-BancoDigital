const express = require('express');
const { listarContasBancarias, criarContaBancaria, atualizarUsuario, excluirConta } = require('./controladores/contasBancarias');
const { depositar, listarDepositos, sacar, listarSaques, transferir, listarTransferencias } = require('./controladores/transacoes');
const { transferencias } = require('./bancodedados');

const rotas = express();

rotas.get('/contas', listarContasBancarias);
rotas.post('/contas', criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta)

rotas.post('/transacoes/depositar', depositar)
rotas.get('/depositos', listarDepositos);
rotas.post('/transacoes/sacar', sacar)
rotas.get('/saques', listarSaques);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/transferencias', listarTransferencias)

module.exports = { rotas }