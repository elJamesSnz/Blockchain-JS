import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
    let blockchain;
    let blockchainB;
    beforeEach(() =>{
        //se recupera el bloque génesis
        blockchain = new Blockchain();
        blockchainB = new Blockchain();
    });

    it('Debe de tener un bloque génesis', () =>{
        //se instancia un nuevo bloque
        const [genesisBlock] = blockchain.blocks;
        expect(genesisBlock).toEqual(Block.genesis);
        expect(blockchain.blocks.length).toEqual(1);
    });

    
    it('Se usa addblock()', () => {
        const data = 'data-test-add-block'
        blockchain.addBlock(data);
        const[, lastBlock] = blockchain.blocks;
        expect(lastBlock.data).toEqual(data);
        expect(blockchain.blocks.length).toEqual(2);
    });

    it('Se usa replace() con una cadena válida', () => {
        const data = 'data-test-add-block-replace'
        blockchainB.addBlock(data);
        //Se hace el reemplazo entre las blockchains para sincronizarlas
        blockchain.replace(blockchainB.blocks);
        expect(blockchain.blocks).toEqual(blockchainB.blocks);
    });

    it('Se usa replace() pero no se realiza el cambio porque la cadena recibida es más pequeña', () => {
        const data = 'data-test-add-block-replace-no-long-enough'
        blockchain.addBlock(data);
        //Se hace el reemplazo entre las blockchains para sincronizarlas        
        expect(() => {

            //se intenta cambiar una cadena más larga con una cadena que solo incluye el bloque génesis
            blockchain.replace(blockchainB.blocks);
        }).toThrowError('Cadena recibida no es más larga que la cadena actual.');
    });


    it('Se usa replace() pero no se realiza el cambio porque la cadena no es válida o está corrupta', () => {
        const data = 'data-test-add-block-replace-corupt'
        blockchainB.addBlock(data);
        blockchainB.blocks[1].data = 'block-corrupt'
        //Se hace el reemplazo entre las blockchains para sincronizarlas        
        expect(() => {

            //se intenta cambiar una cadena más larga con una cadena que incluye un bloque alterado
            blockchain.replace(blockchainB.blocks);
        }).toThrowError('Se recibió cadena inválida');
    });

});