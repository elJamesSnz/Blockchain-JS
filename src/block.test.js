import Block from './block';

//Clase para hacer test en la creación de bloques, se corre con jarn test en terminal
describe('Block', () => {
    let timestamp;
    let previousBlock;
    let data;
    let hash;

    beforeEach(() =>{
        //se recupera el bloque génesis
        timestamp = new Date(2020, 0, 1);
        previousBlock = Block.genesis;
        data = 'test-data-hash';
        hash = 'hash';
    });

    it('Se crea una instancia con parámetros', () =>{
        //se instancia un nuevo bloque
        const block = new Block(timestamp, previousBlock.Hash, hash, data);

        //Se comparan los resultados entre el bloque creado en it
        //con los datos del bloque generado en before_Each con el génesis

        expect(block.timestamp).toEqual(timestamp);
        expect(block.previousHash).toEqual(previousBlock.Hash);
        expect(block.data).toEqual(data);
        expect(block.Hash).toEqual(hash);

    });

    it('Se usa mine()', () => {
        const block = Block.mine(previousBlock, data);
        expect(block.Hash.length).toEqual(64);
        expect(block.previousHash).toEqual(previousBlock.Hash);
        expect(block.data).toEqual(data);
    });

    it('Se usa _hash', () => {
        hash = Block._hash(timestamp, previousBlock.Hash, data);
        const hashOutput = 'd5699e5908b4bd618644d3a2daac81830ad50d88b4901a2741a6868b8be10064';
        expect(hash).toEqual(hashOutput);
    });
    
    it('Se usa toString', () => {
        const block = Block.mine(previousBlock, data);

        expect(typeof block.toString()).toEqual('string');
    });

});