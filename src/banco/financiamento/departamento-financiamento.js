const { Variables } = require('camunda-external-task-client-js');
const { sendMail } = require('../../external/mail');
const axios = require('axios');

const verificarRendimentosComprovados = async ({ task, taskService }) => {
  try {
    console.log(`Rendimentos comprovados verificados: ${task.businessKey}`);

    const processVariables = new Variables();
    processVariables.set("aprovadoRendimentosComprovados", true);

    await taskService.complete(task, processVariables);
  } catch (error) {
    console.log(`Erro: ${erro.message}`);
  }
}

const notificarAprovacao = async ({ task, taskService }) => {
  const { nome, email } = task.variables.getAll();
  sendMail(email, 'Surpresa 😱', `Prezado ${nome},<br><br>gostaríamos de informar que seu financiamento foi... Aprovado!!! 🥳🥳🥳<br>`);

  console.log(`Aprovado Cliente: ${task.businessKey}`);
  await taskService.complete(task);
}

const notificarReprovacao = async ({ task, taskService }) => {
  const { nome, email } = task.variables.getAll();
  sendMail(email, 'Poxa 😔', `Prezado ${nome},<br><br>infelizmente seu financiamento foi reprovado.`);

  console.log(`Reprovado Cliente: ${task.businessKey}`);
  await taskService.complete(task);
}

const requisitarVerificacaoSaudeFinanceira = async ({ task, taskService }) => {
  console.log(`Saúde financeira requisitada: ${task.businessKey}`);

  const url = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mock-orgao-federal-especializado`
  await taskService.complete(task);
  await axios.post(url, { businessKey: task.businessKey }).catch(e => console.log(e))
}


module.exports = { verificarRendimentosComprovados, requisitarVerificacaoSaudeFinanceira, notificarAprovacao, notificarReprovacao }