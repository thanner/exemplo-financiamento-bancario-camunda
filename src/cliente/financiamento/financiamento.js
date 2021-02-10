const axios = require('axios');

const enviarSolicitacaoBanco = async ({ task, taskService }) => {
    try {
        const url = `${process.env.CAMUNDA_PATH}/message`
        const { nome, cpf, cep, email, salario, valorTotalFinanciamento } = task.variables.getAll();

        const body = {
            "messageName": "message-financiamento-solicitado",
            "businessKey": task.businessKey,
            "processVariables": {
                "nome": {
                    "value": nome,
                    "type": "String"
                },
                "cpf": {
                    "value": cpf,
                    "type": "String"
                },
                "cep": {
                    "value": cep,
                    "type": "String"
                },
                "email": {
                    "value": email,
                    "type": "String"
                },
                "salario": {
                    "value": salario,
                    "type": "Long"
                },
                "valorTotalFinanciamento": {
                    "value": valorTotalFinanciamento,
                    "type": "Long"
                }
            }
        }

        axios.post(url, { ...body }).catch(e => console.log(e));
        await taskService.complete(task);
    } catch (e) {
        console.log(e)
    }
}

module.exports = { enviarSolicitacaoBanco }