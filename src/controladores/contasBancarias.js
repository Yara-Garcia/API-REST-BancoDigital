const dadosDoBanco = require('../bancodedados');
const { format } = require('date-fns');
const { validarSenha } = require('../intermediarios');
let numeroConta = 1;

const listarContasBancarias = async (req, resp) => {
    resp.json(dadosDoBanco.contas)
}

const verificarTodosOsCampos = async (req, resp) => {
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

}


const criarContaBancaria = async (req, resp) => {

    try {
        await verificarTodosOsCampos(req, resp);

        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

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
    } catch (error) {
        return resp.status(500).json(`Ocorreu um erro: ${error.message}`)
    }

}

const atualizarUsuario = async (req, resp) => {

    try {
        await verificarTodosOsCampos(req, resp);

        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
        const numeroConta = Number(req.params.numeroConta)

        if (isNaN(numeroConta)) {
            return resp.status(400).json({ mensagem: 'O número da conta não é um número válido. Por favor, tente novamente!' });
        }

        const contaExistente = dadosDoBanco.contas.find((conta) => {
            return conta.numeroConta === numeroConta
        })

        if (!contaExistente) {
            return resp.status(404).json({ mensagem: "Esta conta bancária não foi encontrada." })
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

        contaExistente.nome = nome
        contaExistente.cpf = cpf
        contaExistente.data_nascimento = data_nascimento
        contaExistente.telefone = telefone
        contaExistente.email = email
        contaExistente.senha = senha

        return resp.status(204).send()
    } catch (error) {
        return resp.status(500).json(`Ocorreu um erro: ${error.message}`)
    }
}

module.exports = {
    listarContasBancarias,
    criarContaBancaria,
    atualizarUsuario
}