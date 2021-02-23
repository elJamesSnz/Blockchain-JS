//Aquí comienza sevicio http
import express from 'express'
import bodyParser from 'body-parser'

import Blockchain from '../blockchain';
import P2PService, {MSG} from './p2p';
import Wallet from '../wallet';

//para que escuche en un puerto por defecto
const  { HTTP_PORT = 3000} = process.env;

const app = express();
const blockchain = new Blockchain();
const wallet = new Wallet(blockchain);
//Se crea una instancia de p2pservice y se le envía la cadena de bloques
const p2pService = new P2PService(blockchain);

//blockchain.addBlock('bloque-Express');

app.use(bodyParser.json());

//Para obtener los bloques minados
app.get('/blocks', (req, res) =>{
    res.json(blockchain.blocks);
});

//Para recibir la solicit de minar
app.post('/mine', (req, res) => {
    const { body: { data }} = req;
    const block = blockchain.addBlock(data);

    p2pService.sync();

    //Tras recibir la solicitud, hace la respuesta con la siguiente información
    res.json({
        blocks: blockchain.blocks.length,
        block    
    });

})

app.get('/transactions', (req, res) =>{
    const { memoryPool: {transactions} } = blockchain;
    res.json(transactions);
});

app.post('/transaction', (req, res) =>{
    const { body: {recipient, amount} } = req;
    try {
        const tx = wallet.createTransaction(recipient, amount);
        p2pService.broadcast(MSG.tx, tx)
        res.json(tx);
        
    } catch (error) {
        res.json({error: error.message});
    }
});

//Se pone a esuchcar solicitudes
app.listen(HTTP_PORT, ()=>{

    console.log(`Servicio HTTP: ${HTTP_PORT} escuchando...`);    
    p2pService.listen();

});