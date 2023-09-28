const dadosDoBanco = require('./bancodedados');
const { listarContasBancarias } = require('./controladores/contasBancarias');

const validarSenha = (req, resp, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return resp.status(400).json({ mensagem: 'É obrigatório informar a senha!' })
    }

    if (senha_banco !== "Cubos123Bank") {
        return resp.status(400).json({ mensagem: 'A senha do banco informada é inválida. Por favor, tente novamente!' })
    }

    next()

}

module.exports = {
    validarSenha
}