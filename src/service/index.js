//Aquí comienza sevicio http
import express from 'express'
import bodyParser from 'body-parser'

import Blockchain from '../blockchain';

//para que escuche en un puerto por defecto
const  { HTTP_PORT = 3000} = process.env;

const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());
app.get('/blocks', (req, res) =>{
    res.json(blockchain.blocks);
});

//Se pone a esuchcar solicitudes
app.listen(HTTP_PORT, ()=>{

    console.log(`Servicio HTTP: ${HTTP_PORT} escuchando...`);    

});