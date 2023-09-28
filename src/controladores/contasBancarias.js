const dadosDoBanco = require('../bancodedados')

const listarContasBancarias = async (req, resp) => {
    resp.json(dadosDoBanco.contas)
}

module.exports = {
    listarContasBancarias
}