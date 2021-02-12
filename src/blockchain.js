import Block from './block';
import validate from './modules/validate';
class Blockchain{

    constructor(){
        //Cuando se ejectue el constructor se generará automáticamente el bloque génesis
        this.blocks = [Block.genesis];
    }

    addBlock(data){

        //obtiene el últime bloque restando la longitud - 1
        const previousBlock = this.blocks[this.blocks.length-1];
        //Mina el bloque
        const block = Block.mine(previousBlock, data);
        //Agrega el bloque a la cadena blockchain
        this.blocks.push(block);

        return block;
    }

    replace(newBlocks = []){
        //comprobar la longitud de bloque
        if(newBlocks.length < this.blocks.length) throw Error('Cadena recibida no es más larga que la cadena actual.');
        try{

            //Comprueba la integridad de la blockchain
            validate(newBlocks);
        }catch(error){
            throw Error('Se recibió cadena inválida');
        }

        this.blocks = newBlocks;

        return this.blocks;
    }
}

export default Blockchain;