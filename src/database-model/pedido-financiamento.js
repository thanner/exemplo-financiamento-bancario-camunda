const { v4: uuidv4 } = require('uuid');
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const pedidoFinanciamento = sequelize.define(
        'pedidofinanciamento',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            businessKey: { allowNull: false, type: DataTypes.UUID, primaryKey: true },
            nome: { allowNull: false, type: DataTypes.STRING },
            cpf: { allowNull: false, type: DataTypes.STRING },
            email: { allowNull: false, type: DataTypes.STRING },
            salario: { type: DataTypes.DECIMAL(10, 2) },
            valorTotalFinanciamento: { type: DataTypes.DECIMAL(10, 2) },
            juros: { type: DataTypes.DECIMAL(10, 3) },
            cep: { allowNull: false, type: DataTypes.STRING },
            logradouro: DataTypes.STRING,
            complemento: DataTypes.STRING,
            bairro: DataTypes.STRING,
            localidade: DataTypes.STRING,
            uf: DataTypes.STRING,
            updatedAt: DataTypes.DATE,
            createdAt: DataTypes.DATE
        },
    );

    pedidoFinanciamento.beforeBulkCreate((a) => (a.id = uuidv4()));
    return pedidoFinanciamento;
}