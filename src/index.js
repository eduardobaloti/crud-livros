const http = require("http");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const porta = 3000;

app.set("port", porta);
const server = http.createServer(app);
server.listen(3000);

let id = 1;
let livros = [
    {
        id: 1,
        isbn: "021349140",
        titulo:"Sherlock Holmes",
        descricao:"Quando uma série de assassinatos brutais aterroriza Londres, não demora muito para o lendário detetive Sherlock Holmes e seu parceiro solucionador de crimes",
        edicao:"2",
        autor:"Arthur Conan Doyle",
    },
];

let livros2 = [];

app.post("/livros", (req, res, next) => {
    const livro = {
        id: (id += 1),
        isbn: req.body.isbn,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        edicao: req.body.edicao,
        autor: req.body.autor,
    };
    livros.push(livro);
    res.status(201).json(livro);
});

app.get("/livros", (req, res, next) => {
    res.status(200).json(livros);
});

app.put("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id) {
            livros.isbn = req.body.isbn
            livro.titulo = req.body.titulo;
            livro.descricao = req.body.descricao;
            livro.edicao = req.body.edicao;
            livro.autor = req.body.autor;
        }
    });
    res.status(204).end();
});

app.delete("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id != req.body.id) {
            const livro2 = {
                id: livro.id,
                isbn: livro.isbn,
                titulo: livro.titulo,
                descricao: livro.descricao,
                edicao: livro.edicao,
                autor: livro.autor,
                

            };
            livros2.push(livro2);
        }
    });
    livros = livros2;
    res.json(livros)
    res.status(204).end();
});
