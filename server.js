const express = require("express");
const app = express();

app.listen(3000, function(){
    console.log("Server inciado na porta 3000")
});

//devolver um response quando a requisição get bater na raíz
app.get("/", (req, res) => {
    res.send("Iniciado")
});

//testando rotas
app.get("/CRUD", (req, res) => {
    res.send("CRUD")
});