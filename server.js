const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

//iniciando db
const url = "mongodb+srv://MatheusNougueira:JK4GrCs2cgT0ZnCI@cluster0-wbsv9.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, (err, client) => {
    if (err)
        return console.log(err);
    db = client.db("MatheusNougueira"),

        app.listen(3000, function () {
            console.log("Server inciado na porta 3000")
        });
});

//incluindo BodyParser no projeto para lidar com dados enviados pelo <form>
app.use(bodyParser.urlencoded({ extended: true }));

//apontando direção 
app.use(express.static(path.join(__dirname, "views")));

//apontando para renderizar o arquivo no navegador
app.get("/", (req, res) => {
    res.render("../views/index")
});

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

//rota post
app.post("/show", (req, res) => {

    //criando coleção para armazenamento de dados
    db.collection("data").save(req.body, (err, result) => {
        if (err)
            return console.log(err);

        console.log("Dados salvos com sucesso")

        //redirecionando usuário para a raíz após realizar cadastro
        res.redirect("/show")
        })
    })

