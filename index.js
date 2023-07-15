import express from "express";
import cors from 'cors';
import { addPost, getPosts } from "./rest.js";

const PORT = 3000;

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));  


// ROUTES
app.post('/post', async (req, res) => {

    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1;
    var ano = dataAtual.getFullYear();
    var hora = dataAtual.getHours();
    var minutos = dataAtual.getMinutes();

    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (hora < 10) {
        hora = '0' + hora;
    }
    if (minutos < 10) {
        minutos = '0' + minutos;
    }

    var dataFormatada = dia + '/' + mes + '/' + ano;
    var horaFormatada = hora + ':' + minutos;

    let author = req.body.author;
    let message = req.body.message;
    let date = horaFormatada + ' | ' + dataFormatada;

    const post = {
        author: author,
        message: message,
        date: date
    };

    const actionPost = await addPost(post);

    if(actionPost) {
        res.send("Successful post!");
    } else {
        res.send("Post failed!");
    }
    
});

app.get('/post', async (req, res) => {

    const posts = await getPosts();

    res.send(posts);
    
})

app.listen(PORT, () => {

    console.log(`Open server on port: ${PORT}!`);
    
})
