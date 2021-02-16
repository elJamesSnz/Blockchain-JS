import Block, {ogDifficulty} from './block';

//Clase para hacer test en la creación de bloques, se corre con jarn test en terminal
describe('Block', () => {
    let timestamp;
    let previousBlock;
    let data;
    let hash;
    let nonce;

    beforeEach(() =>{
        //se recupera el bloque génesis
        timestamp = new Date(2020, 0, 1);
        previousBlock = Block.genesis;
        data = 'test-data-hash';
        hash = 'hash';
        nonce = 128;
    });

    it('Se crea una instancia con parámetros', () =>{
        //se instancia un nuevo bloque
        const block = new Block(timestamp, previousBlock.Hash, hash, data, nonce);

        //Se comparan los resultados entre el bloque creado en it
        //con los datos del bloque generado en before_Each con el génesis

        expect(block.timestamp).toEqual(timestamp);
        expect(block.previousHash).toEqual(previousBlock.Hash);
        expect(block.data).toEqual(data);
        expect(block.Hash).toEqual(hash);
        expect(block.nonce).toEqual(nonce);
    });

    it('Se usa mine()', () => {
        const block = Block.mine(previousBlock, data);
        const { difficulty } = block;

        //Se compara la longitud del hash256
        expect(block.Hash.length).toEqual(64);
        //Se compara la dificultad, es decir, el número de 0s al inicio del hash
        expect(block.Hash.substring(0, difficulty)).toEqual('0'.repeat(difficulty));
        //Se compara el hash del bloque previo
        expect(block.previousHash).toEqual(previousBlock.Hash);
        //Se espera que el nonce (numero aleatorio por ser el numero de intentos) no sea 0, minimo 1
        expect(block.nonce).not.toEqual(0);
        //Se compara que la data sea igual
        expect(block.data).toEqual(data);
    });

    it('Se usa _hash', () => {
        //Se realiza hash256 con los datos de test
        hash = Block._hash(timestamp, previousBlock.Hash, data, nonce);
        //Para el bloque esperado previamente probado,  sale el siguiente timestamp
        const hashOutput = '6d637a7dd633b370c5654b9ccbd61a5856ed713cc07731745981d86721751027';
        expect(hash).toEqual(hashOutput);
    });
    
    it('Se usa toString', () => {
        const block = Block.mine(previousBlock, data);
        //ToString para comprobar la cadena recibida
        //console.log(block.toString()); 
        expect(typeof block.toString()).toEqual('string');
    });

});