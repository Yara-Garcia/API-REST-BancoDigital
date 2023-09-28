const dadosDoBanco = require('../bancodedados');
const { format } = require('date-fns')
let numeroConta = 1;

const listarContasBancarias = async (req, resp) => {
    resp.json(dadosDoBanco.contas)
}

const criarContaBancaria = async (req, resp) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        resp.status(400).json({ mensagem: 'O campo nome é obrigatório!' })
    }

    if (!cpf) {
        resp.status(400).json({ mensagem: 'O campo cpf é obrigatório!' })
    }

    if (!data_nascimento) {
        return resp.status(400).json({ mensagem: 'O campo data de nascimento é obrigatório!' })
    }

    if (!telefone) {
        return resp.status(400).json({ mensagem: 'O campo telefone é obrigatório!' })
    }

    if (!email) {
        return resp.status(400).json({ mensagem: 'O campo email é obrigatório!' })
    }

    if (!senha) {
        return resp.status(400).json({ mensagem: 'O campo senha é obrigatório!' })
    }

    const cpfCadastrado = dadosDoBanco.contas.some((conta) => {
        return conta.cpf === cpf
    })

    const emailCadastrado = dadosDoBanco.contas.some((conta) => {
        return conta.email === email
    })

    if (cpfCadastrado || emailCadastrado) {
        return resp.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
    }


    const novaConta = {
        numeroConta,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        saldo: 0
    }

    dadosDoBanco.contas.push(novaConta)
    numeroConta++

    return resp.status(201).send()
}


module.exports = {
    listarContasBancarias,
    criarContaBancaria
}