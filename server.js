const express = require("express");
const app = express();

app.listen(3000, function(){
    console.log("Server inciado na porta 3000")
});

//importando 
app.set("view engine", "ejs");

//apontando para renderizar o arquivo no navegador
app.get("/", (req, res) => {
    res.render("index.ejs")
});