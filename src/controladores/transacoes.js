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

module.exports = {
    depositar
}
