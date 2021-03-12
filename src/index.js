//importa os módulos http e express
const http = require("http");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const porta = 3000;

app.set("port", porta);
const server = http.createServer(app);
server.listen(3000);

let id = 2;
let alunos = [
    {
        id: 1,
        nome: "João",
        fone: "11223344",
        email: "joao@email.com",
    },
    {
        id: 2,
        nome: "Maria",
        fone: "55221133",
        email: "maria@email.com",
    },
];

let alunos2 = [];

app.post("/alunos", (req, res, next) => {
    const aluno = {
        id: (id += 1),
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email,
    };
    alunos.push(aluno);
    res.status(201).json(aluno);
});

app.get("/alunos", (req, res, next) => {
    res.status(200).json(alunos);
});

app.put("/alunos", (req, res, next) => {
    alunos.forEach((aluno) => {
        if (aluno.id === req.body.id) {
            aluno.nome = req.body.nome;
            aluno.fone = req.body.fone;
            aluno.email = req.body.email;
        }
    });
    res.status(204).end();
});

app.delete("/alunos", (req, res, next) => {
    alunos.forEach((aluno) => {
        if (aluno.id != req.body.id) {
            const aluno2 = {
                id: aluno.id,
                nome: aluno.nome,
                fone: aluno.fone,
                email: aluno.email,
            };
            alunos2.push(aluno2);
        }
    });
    alunos = alunos2;
    res.status(204).end();
});
