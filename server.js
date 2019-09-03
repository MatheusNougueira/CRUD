const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID

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

//renderizando a rora "show" quando o usuário enviar os dados
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

//indicando qual rotas iremos observar e os métodos
app.route("/edit/:id")
    //armazenando em "var id" o id que será passado no params vindo da view 
    .get((req, res) => { //métodos serão feitos primeiro no servidor depois na view
        var id = req.params.id
        //usando variável para encontrar o objeto que será alterado através da função ".find(Object(id))"
        db.collection("data").find(ObjectId(id)).toArray((err, result) => {
            if (err)
                return res.send(err)

            //irá renderizar a view
            res.render("edit.ejs", { data: result })
        })
    })
    .post((req, res) => {
        var id = req.params.id
        var name = req.body.name
        var surname = req.body.surname
        var course = req.body.course

        db.collection("data").updateOne({ _id: ObjectId(id) }, {
            $set: {
                name: name,
                surname: surname,
                course: course
            }
        }, (err, result) => {
            if (err)
                return res.send(err)
            res.redirect("/show")
            console.log("Banco de dados atualizado com sucesso!")
        })
    })