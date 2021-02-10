const { salva } = require('../persistencia/pedido-financiamento');

const registrarFinanciamento = async ({ task, taskService }) => {
    try {
        const businessKey = task.businessKey;
        const { nome, cpf, email, salario, valorTotalFinanciamento, juros, cep, logradouro, complemento, bairro, localidade, uf } = task.variables.getAll();
        salva({ businessKey, nome, cpf, email, salario, valorTotalFinanciamento, juros, cep, logradouro, complemento, bairro, localidade, uf });

        await taskService.complete(task);
    } catch (e) {
        console.log(e);
    }
}

module.exports = { registrarFinanciamento }