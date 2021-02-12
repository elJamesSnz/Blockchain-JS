import WebSocket from 'ws';
import Block from '../block';

//Es el puerto para el web socket, peer to peer
const  { P2P_PORT = 5000, PEERS} = process.env; 
//lista de sockets: PEERS
const peers = PEERS ? PEERS.split(',') : []; //ternaria: por si no es una lista de nodos a conectar

class P2PService{
    constructor(blockchain)
    {
        this.blockchain = blockchain;
        this.sockets = [];
    }
    
    listen(){

        //se instancia el método server de websocket y se le envía el puero 5000
        const server = new WebSocket.Server({port: P2P_PORT});
        //Permite capturar eventos, recibe string (evento)
        server.on('connection', (socket) => this.onConnection(socket));

        peers.forEach((peer) => {
            
            const socket = new WebSocket(peer); //Socket cliente
            //Se captura evento open, en una conexión abierta o en conexión, se realiza una acción. En este caso, onconnection
            socket.on('Open', () => this.onConnection(socket)); 
        });

        //va a esperar nuevas conexiones de otros nodos
        console.log(`Servicio P2P ws: ${P2P_PORT} escuchando...`);
    }

    onConnection(socket){
        console.log('[ws:socket] conectado');
        this.sockets.push(socket);


    }
}


export default P2PService;