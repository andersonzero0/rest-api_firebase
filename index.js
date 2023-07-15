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
    var options = { timeZone: 'America/Sao_Paulo' };
    var dia = dataAtual.toLocaleString('pt-BR', options, { day: '2-digit' });
    var mes = dataAtual.toLocaleString('pt-BR', options, { month: '2-digit' });
    var ano = dataAtual.toLocaleString('pt-BR', options, { year: 'numeric' });
    var hora = dataAtual.toLocaleString('pt-BR', options, { hour: '2-digit', hour12: false });
    var minutos = dataAtual.toLocaleString('pt-BR', options, { minute: '2-digit' });
    
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
