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



