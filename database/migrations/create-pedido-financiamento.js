'use strict'

module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable(
            'pedidofinanciamento',
            {
                id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
                businessKey: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
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
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            }
        )
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('pedidofinanciamento');
    }
}