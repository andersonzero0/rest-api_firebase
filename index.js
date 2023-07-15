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
    var options = { 
      timeZone: 'America/Sao_Paulo', 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    
    var dataFormatada = dataAtual.toLocaleString('pt-BR', options);
    
    let author = req.body.author;
    let message = req.body.message;
    let date = dataFormatada;
    
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
