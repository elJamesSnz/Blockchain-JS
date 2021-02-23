import WebSocket from 'ws';


//Es el puerto para el web socket, peer to peer
const  { P2P_PORT = 5000, PEERS } = process.env; 
//lista de sockets: PEERS
const peers = PEERS ? PEERS.split(',') : []; //ternaria: por si no es una lista de nodos a conectar
const MSG = { 
    BLOCKS: 'blocks', 
    TX: 'transaction',
};

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
        socket.on('message', (message) =>{
            const { type, value} = JSON.parse(message);

            try {
                if(type === MSG.BLOCKS){

                    //intenta actualizar - sincronizar la cadena
                    this.blockchain.replace(value);
                }
                else if(type === MSG.TX) blockchain.memoryPool.addorUpdate(value);

            } catch (error) {
                console.log(`[ws:mmensaje] - ERROR ${error}`);
                throw Error(error);
            }

            console.log({type, value});
        });                
        //se manda mensaje cuando hay conexión
        socket.send(JSON.stringify({type: MSG.BLOCKS, value: blocks})) //recibe una cadena string
    }

    sync(){
        const {blockchain: { blocks }} = this;
        this.broadcast(MSG.BLOCKS, blocks);
    }

    //se manda mensaje a toda la red
    broadcast(type, value){
        console.log(`[ws:broadcast - GLOBAL] ${type}...`);
        const msg = JSON.stringify({ type, value});
        this.sockets.forEach((socket) => socket.send(msg)); // se recorren los sockets conectados y se envía el mensaje
    }
}

export {MSG};
export default P2PService;