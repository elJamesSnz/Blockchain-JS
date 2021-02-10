import { SHA256 } from 'crypto-js';

class Block{
    constructor(timestamp, previousHash, Hash, data) //Método constructor
    {
        this.timestamp  = timestamp;
        this.previousHash  = previousHash;
        this.Hash  = Hash;
        this.data  = data;
    }

    static get genesis(){ //genera instancia del nodo bloque
        const timestamp = (new Date(2021, 0, 1).getTime());
        return new this(timestamp, undefined, 'bloque-0', 'genesis');
    }

    //función para agregar bloques a la blockchain
    static mine(previousBlock, data){
        const timeStamp = Date.now();
        const  {Hash: previousHash} = previousBlock;
        const hash = Block._hash(timeStamp, previousHash, data);

        return new this(timeStamp, previousHash, hash, data);
    }

    //Se hace el cifrado y se obtiene la cadena de 32 bytes a partir de los datos de la blockchain y el timestamp
    static _hash(timestamp, previoushash, data){

        return SHA256(`${timestamp}${previoushash}${data}`).toString();
    }

    toString(){
        const{
            timestamp, previousHash, Hash, data
        } = this;

        return `Block -
        timestamp ---------> ${timestamp}
        previousHash ---------> ${previousHash}
        Hash ---------> ${Hash}
        data ---------> ${data}        
        `;
    }
}

export default Block; //Se exporta la clase