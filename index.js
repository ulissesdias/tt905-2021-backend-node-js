const express = require("express");
const app = express();

// Permissões
var cors = require('cors');
app.use(cors());

// Porta que eu estou ouvindo
app.listen(3000);

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
    "Elziele da Rocha", "Lucas Canova dos Santos"
];

app.get('/mensagens',
    function(req, res){
        res.send(mensagens);
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
