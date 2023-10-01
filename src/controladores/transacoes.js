const dadosDoBanco = require('../bancodedados');
const format = require('date-fns/format');

const depositar = async (req, resp) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        resp.status(400).json({ mensagem: 'O campo numero da conta é obrigatório!' })
    }

    if (!valor) {
        resp.status(400).json({ mensagem: 'O campo valor é obrigatório!' })
    }

    const contaExistente = dadosDoBanco.contas.find((conta) => {
        return conta.numeroConta === Number(numero_conta)
    })

    if (!contaExistente) {
        return resp.status(404).json({ mensagem: "Conta bancária não encontrada!" })
    }

    if (valor <= 0) {
        return resp.status(400).json({ mensagem: "O valor do depósito deve ser maior que zero!" })
    }

    contaExistente.saldo += valor

    const novoDeposito = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    }

    dadosDoBanco.depositos.push(novoDeposito)

    return resp.status(201).send()

}

const listarDepositos = async (req, resp) => {
    return resp.status(200).json(dadosDoBanco.depositos)
}

const sacar = async (req, resp) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) {
        resp.status(400).json({ mensagem: 'O campo numero da conta é obrigatório!' })
    }

    if (!valor) {
        resp.status(400).json({ mensagem: 'O campo valor é obrigatório!' })
    }

    if (!senha) {
        resp.status(400).json({ mensagem: 'O campo senha é obrigatório!' })
    }

    const contaExistente = dadosDoBanco.contas.find((conta) => {
        return conta.numeroConta === Number(numero_conta)
    })

    if (!contaExistente) {
        return resp.status(404).json({ mensagem: "Conta bancária não encontrada!" })
    }

    if (isNaN(Number(senha)) || senha !== contaExistente.senha) {
        return resp.status(400).json({ mensagem: "Senha inválida. Por favor, tente novamente!" })
    }

    if (valor > contaExistente.saldo) {
        return resp.status(400).json({ mensagem: "Saldo insuficiente para saque!" })
    }

    contaExistente.saldo -= valor

    const novoSaque = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta,
        valor
    }

    dadosDoBanco.saques.push(novoSaque)

    return resp.status(201).send()
}

const listarSaques = async (req, resp) => {
    return resp.status(200).json(dadosDoBanco.saques)
}

const transferir = async (req, resp) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem) {
        resp.status(400).json({ mensagem: 'O campo numero da conta de origem é obrigatório!' })
    }

    if (!numero_conta_destino) {
        resp.status(400).json({ mensagem: 'O campo numero da conta de destino é obrigatório!' })
    }

    if (!valor) {
        resp.status(400).json({ mensagem: 'O campo valor é obrigatório!' })
    }

    if (!senha) {
        resp.status(400).json({ mensagem: 'O campo senha é obrigatório!' })
    }

    const contaOrigemExistente = dadosDoBanco.contas.find((conta) => {
        return conta.numeroConta === Number(numero_conta_origem)
    })

    if (!contaOrigemExistente) {
        return resp.status(404).json({ mensagem: "Conta bancária de origem não encontrada!" })
    }

    const contaDestinoExistente = dadosDoBanco.contas.find((conta) => {
        return conta.numeroConta === Number(numero_conta_destino)
    })

    if (!contaDestinoExistente) {
        return resp.status(404).json({ mensagem: "Conta bancária de destino não encontrada!" })
    }

    if (isNaN(Number(senha)) || senha !== contaOrigemExistente.senha) {
        return resp.status(400).json({ mensagem: "Senha inválida. Por favor, tente novamente!" })
    }

    if (valor > contaOrigemExistente.saldo) {
        return resp.status(400).json({ mensagem: "Saldo insuficiente para operação!" })
    }

    contaOrigemExistente.saldo -= valor

    contaDestinoExistente.saldo += valor

    const novaTransferencia = {
        data: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    dadosDoBanco.transferencias.push(novaTransferencia)

    return resp.status(201).send()

}

const listarTransferencias = async (req, resp) => {
    return resp.status(200).json(dadosDoBanco.transferencias)
}

module.exports = {
    depositar,
    listarDepositos,
    sacar,
    listarSaques,
    transferir,
    listarTransferencias
}
