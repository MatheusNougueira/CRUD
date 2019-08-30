const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const engine = require("consolidate");

//incluindo BodyParser no projeto para lidar com dados enviados pelo <form>
app.use(bodyParser.urlencoded({ extended: true }))

//mensagem no terminal ao iniciar servidor
app.listen(3000, function(){
    console.log("Server inciado na porta 3000");
});

//apontando direção 
app.use(express.static(path.join(__dirname, "views")));

//apontando para renderizar o arquivo no navegador
app.get("/", (req, res) => {
    res.render("../views/index")
});

//rota post
app.post("/show", (req, res) => {
    console.log(req.body)

    return res.send("Dados salvos com sucesso") //retornará ao usuário a mensagem
});
