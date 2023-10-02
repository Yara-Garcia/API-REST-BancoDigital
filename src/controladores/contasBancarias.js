const dadosDoBanco = require('../bancodedados');

let numeroConta = 1;

const listarContasBancarias = async (req, resp) => {
    return resp.status(200).json(dadosDoBanco.contas)
}

const verificarTodosOsCampos = async (req, resp, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return resp.status(400).json({ mensagem: 'O campo nome é obrigatório!' })
    }

    if (!cpf) {
        return resp.status(400).json({ mensagem: 'O campo cpf é obrigatório!' })
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

    next()
}

const criarContaBancaria = async (req, resp) => {

    try {

        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        const cpfCadastrado = dadosDoBanco.contas.some((conta) => {
            return conta.usuario.cpf === cpf
        })

        const emailCadastrado = dadosDoBanco.contas.some((conta) => {
            return conta.usuario.email === email
        })

        if (cpfCadastrado || emailCadastrado) {
            return resp.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
        }

        const novaConta = {
            numeroConta,
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
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
            return conta.usuario.cpf === cpf
        })

        const emailCadastrado = dadosDoBanco.contas.some((conta) => {
            return conta.usuario.email === email
        })

        if (cpfCadastrado || emailCadastrado) {
            return resp.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
        }

        contaExistente.usuario.nome = nome
        contaExistente.usuario.cpf = cpf
        contaExistente.usuario.data_nascimento = data_nascimento
        contaExistente.usuario.telefone = telefone
        contaExistente.usuario.email = email
        contaExistente.usuario.senha = senha

        return resp.status(204).send()
    } catch (error) {
        return resp.status(500).json(`Ocorreu um erro: ${error.message}`)
    }
}

const excluirConta = async (req, resp) => {

    const numeroConta = Number(req.params.numeroConta);

    if (isNaN(numeroConta)) {
        return resp.status(400).json({ mensagem: 'O número da conta não é um número válido. Por favor, tente novamente!' });
    }

    const contaExistente = dadosDoBanco.contas.find((conta) => {
        return conta.numeroConta === numeroConta
    })

    if (!contaExistente) {
        return resp.status(404).json({ mensagem: "Esta conta bancária não foi encontrada." })
    }

    if (contaExistente.saldo !== 0) {
        return resp.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    }

    const indice = dadosDoBanco.contas.indexOf(contaExistente)
    dadosDoBanco.contas.splice(indice, 1);

    return resp.status(204).send()
}

module.exports = {
    listarContasBancarias,
    verificarTodosOsCampos,
    criarContaBancaria,
    atualizarUsuario,
    excluirConta,
}