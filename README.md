# camunda-service

Exemplo de pedido de financiamento bancário usando Camunda.

O processo BPMN pode ser encontrado em: processo/automatizacao-pedido-financiamento.bpmn

Requisitos:
* NodeJs: https://nodejs.org/en/
* yarn package manager: https://yarnpkg.com/
* Docker: https://www.docker.com/

Para iniciar camunda e bancos:
* docker-compose up

Para iniciar o serviço:
* yarn (baixar libs)
* yarn recreate-database (criar base de dados)
* yarn start (iniciar serviço)
* Mais dados podem ser encontrados no arquivo .env

Obs: Para que seja possível enviar e-mails é necessário fornecer um e-mail (from) e senha (password) em src/external/mail.js.
Exemplo: http://www.youtube.com/watch?v=Va9UKGs1bwI&t=7m30s 