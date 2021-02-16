import Blockchain from "../blockchain";

import Block from '../block';

export default (blockchain) =>{
    const [genesisBlock, ...blocks] = blockchain;

    //Validamos el bloque génesis para que sea el mismo, JSON.stringify obtiene el mismo tipo de dato string
    if(JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) throw Error('El bloque génesis es inválido');

    for(let i = 0; i<blocks.length; i+=1){

        //Se obtienen valores de la cadena blocks de la clase blockchain
        const{
            previousHash, timestamp, Hash, data, nonce, difficulty
        } = blocks[i];

        //Se recupera el bloque en el index i para ser comparado
        const previousBlock = blockchain[i];

        //Se valida el hash previo de cada bloque  de la cadena    
        if(previousHash !== previousBlock.Hash) throw Error('Hash previo inválido');
        //Se valida el hash de cada bloque de la cadena, esto afectaría si
        //se manda una cadena de bloques con el timestamp, previoushash o hash alterado/modificado
        //pues no se obtendría el mismo sha256
        if(Hash !== Block._hash(timestamp, previousHash, data, nonce, difficulty)) throw Error('Hash inválido');
        
    }

    
    return true;
}