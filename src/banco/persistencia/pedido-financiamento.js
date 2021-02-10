const { where } = require('sequelize');
const { pedidofinanciamento } = require('../../database-model');

const salva = async (dadosCliente) => {
    return pedidofinanciamento.create(dadosCliente);
}

const atualiza = async (businessKey, dadosCliente) => {
    return pedidofinanciamento.update(dadosCliente, { where: { businessKey } });
}

module.exports = { salva, atualiza }