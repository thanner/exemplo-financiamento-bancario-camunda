const { Client, logger } = require("camunda-external-task-client-js");
const { Sequelize } = require('sequelize');
const depFinanciamento = require("./banco/financiamento/departamento-financiamento");
const depOnboarding = require("./banco/onboarding/departamento-onboarding");
const financiamentoCliente = require("./cliente/financiamento/financiamento")
const { app } = require('./server')

// Camunda
const config = { baseUrl: process.env.CAMUNDA_PATH, use: logger };
const client = new Client(config);

// Database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, { host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: process.env.DB_DIALECT });

// **************
// Banco
// **************

// Departamento de Financiamento
client.subscribe("service-registrar-financiamento", depOnboarding.registrarFinanciamento);
client.subscribe("service-verificar-rendimentos-comprovados", depFinanciamento.verificarRendimentosComprovados);
client.subscribe("message-notificar-aprovacao", depFinanciamento.notificarAprovacao);
client.subscribe("message-notificar-reprovacao", depFinanciamento.notificarReprovacao);

// **************
// Cliente
// **************

// Financiamento
client.subscribe("message-enviar-solicitacao-banco", financiamentoCliente.enviarSolicitacaoBanco);

module.exports = { sequelize }