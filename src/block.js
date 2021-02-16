import { SHA256 } from 'crypto-js';
import adjustDiffuculty from './modules/adjustDifficulty';
import genHash from './Tools/hash';

const ogDifficulty = 3;

class Block{
    constructor(timestamp, previousHash, Hash, data, nonce, difficulty) //Método constructor
    {
        this.timestamp  = timestamp;
        this.previousHash  = previousHash;
        this.Hash  = Hash;
        this.data  = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static get genesis(){ //genera instancia del nodo bloque
        const timestamp = (new Date(2021, 0, 1).getTime());
        return new this(timestamp, undefined, 'bloque-0', 'genesis', 0, ogDifficulty);
    }

    //función para agregar bloques a la blockchain
    static mine(previousBlock, data){
        const  {Hash: previousHash} = previousBlock;
        let hash;
        let nonce = 0; //número base aleatorio
        let timestamp;
        let { difficulty } = previousBlock

        do{

            timestamp = Date.now();
            nonce += 1; //número aleatorio basado en el # de iteraciones
            difficulty = adjustDiffuculty(previousBlock, timestamp)
            hash = Block._hash(timestamp, previousHash, data, nonce, difficulty); //se genera el sha256
        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, previousHash, hash, data, nonce, difficulty);
    }

    //Se hace el cifrado y se obtiene la cadena de 32 bytes a partir de los datos de la blockchain y el timestamp
    static _hash(timestamp, previoushash, data, nonce, difficulty){

        return genHash(`${timestamp}${previoushash}${data}${nonce}${difficulty}`);
    }

    toString(){
        const{
            timestamp, previousHash, Hash, data, nonce, difficulty
        } = this;

        return `Block -
        timestamp ---------> ${timestamp}
        previousHash ---------> ${previousHash}
        Hash ---------> ${Hash}
        data ---------> ${data}
        nonce ---------> ${nonce}
        difficulty ---------> ${difficulty} 
        `;
    }
}

export { ogDifficulty };
export default Block; //Se exporta la clase