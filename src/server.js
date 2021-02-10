const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const { v4: uuid } = require('uuid');
var path = require('path');

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.SERVER_PORT

app.listen(port, () => {
    console.log(`Listening at http://${process.env.SERVER_HOST}:${port}`)
})

app.get('/cadastro', function (req, res) {
    const html = fs.readFileSync("./html/form-pedido-financiamento.html", "utf-8").toString();
    res.send(html);
})

app.post('/pedido-financiamento', function (req, res) {
    const url = `${process.env.CAMUNDA_PATH}/message`
    const { nome, cpf, cep, email, salario, valorFinanciamento } = req.body;

    const body = {
        "messageName": "message-financiamento-solicitado",
        "businessKey": uuid(),
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
                "value": valorFinanciamento,
                "type": "Long"
            }
        }
    }

    axios.post(url, { ...body }).catch(e => console.log(e));
    res.sendFile(path.join(__dirname + '/../html/cadastro-sucesso.html'));
})

app.post('/mock-orgao-federal-especializado', function (req, res) {
    const url = `${process.env.CAMUNDA_PATH}/message`
    const { businessKey } = req.body

    const body = {
        "messageName": "message-verificacao-saude-financeira",
        "businessKey": businessKey,
        "processVariables": {
            "devedor": {
                "value": false,
                "type": "boolean"
            }
        }
    }
    axios.post(url, { ...body }).catch(e => console.log(e))
    res.sendStatus(200)
})

module.exports = { app }