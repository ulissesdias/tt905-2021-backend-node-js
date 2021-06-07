const express = require("express");
const app = express();
app.use(express.json());

// Permissões
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo
app.listen(process.env.PORT || 3000);

app.get('/', 
    function (req, res){    
        res.send("Hello World");
    }
);

app.get('/hello',
function (req, res){    
    res.send("Hello de Novo");
    }
)

const mensagens = [
    "Elziele da Rocha", "Lucas Canova dos Santos", 0 
];

app.get('/mensagens',
    function(req, res){
        // res.send(mensagens);
        res.send(mensagens.filter(Boolean));
    }
);

app.get('/mensagens/:id',
    function(req, res){
        const id = req.params.id - 1;
        const mensagem = mensagens[id];

        if (!mensagem){
            res.send("Mensagem não encontrada");
        } else {
            res.send(mensagem);
        }
    }
)

app.post('/mensagens', 
    (req, res) => {
        console.log(req.body.mensagem);
        const mensagem = req.body.mensagem;
        mensagens.push(mensagem);
        res.send("criar uma mensagem.")
    }
);

app.put('/mensagens/:id',
    (req, res) => {
        const id = req.params.id - 1;
        const mensagem = req.body.mensagem;
        mensagens[id] = mensagem;        
        res.send("Mensagem atualizada com sucesso.")
    }
)

app.delete('/mensagens/:id', 
    (req, res) => {
        const id = req.params.id - 1;
        delete mensagens[id];

        res.send("Mensagem removida com sucesso");
    }
);

/*
  Daqui para baixo, uso o banco de dados MongoDB
*/

const mongodb = require('mongodb')
const password = process.env.PASSWORD || "asdf";
console.log(password);

const connectionString = `mongodb+srv://admin:${password}@cluster0.fhdc2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
};

(async()=>{
    const client = await mongodb.MongoClient.connect(connectionString, options);
    const db = client.db('myFirstDatabase');
    const mensagens = db.collection('mensagens');
    console.log(await mensagens.find({}).toArray());
})();

/*

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0.fhdc2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/