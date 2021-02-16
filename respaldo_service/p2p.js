import WebSocket from 'ws';
import Block from '../block';

//Es el puerto para el web socket, peer to peer
const  { P2P_PORT = 5000, PEERS } = process.env; 
//lista de sockets: PEERS
const peers = PEERS ? PEERS.split(',') : []; //ternaria: por si no es una lista de nodos a conectar
const MSG = { BLOCKS: 'blocks' };

class P2PService {
    
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
      }
    
    listen(){

        //se instancia el método server de websocket y se le envía el puero 5000
        const server = new WebSocket.Server({ port: P2P_PORT });
        //Permite capturar eventos, recibe string (evento)
        server.on('connection', (socket) => this.onConnection(socket));

        peers.forEach((peer) => {
            
            const socket = new WebSocket(peer); //Socket cliente
            //Se captura evento open, en una conexión abierta o en conexión, se realiza una acción. En este caso, onconnection
            socket.on('open', () => this.onConnection(socket)); 
        });

        //va a esperar nuevas conexiones de otros nodos
        console.log(`Servicio P2P ws: ${P2P_PORT} escuchando...`);
    }

    onConnection(socket){
        const { blockchain: { blocks } } = this; //obtiene cadena de bloques
        console.log('[ws:socket] conectado');
        this.sockets.push(socket);
        console.log('Se intenta mostrar cadena');
        socket.on('message', (message) =>{
            const { type, value} = JSON.parse(message);
            console.log({type, value});
        });
        
        socket.send(JSON.stringify({type: MSG.BLOCKS, value: blocks})) //recibe una cadena string
    }

    broadcast(type, value){
        console.log(`[ws:broadcast] ${type}...`);
        const msg = JSON.stringify({ type, value});
        this.sockets.forEach((socket) => socket.send(msg)); // se recorren los sockets conectados y se envía el mensaje
    }
}


export default P2PService;