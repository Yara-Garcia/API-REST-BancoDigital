const express = require('express');
const { listarContasBancarias, criarContaBancaria, atualizarUsuario, excluirConta, verificarTodosOsCampos } = require('./controladores/contasBancarias');
const { depositar, listarDepositos, sacar, listarSaques, transferir, listarTransferencias, consultarSaldo } = require('./controladores/transacoes');


const rotas = express();

rotas.get('/contas', listarContasBancarias);
rotas.post('/contas', verificarTodosOsCampos, criarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', verificarTodosOsCampos, atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta)

rotas.post('/transacoes/depositar', depositar)
rotas.get('/depositos', listarDepositos);
rotas.post('/transacoes/sacar', sacar)
rotas.get('/saques', listarSaques);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/transferencias', listarTransferencias)
rotas.get('/contas/saldo', consultarSaldo)

module.exports = { rotas }

