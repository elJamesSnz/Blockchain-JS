import Blockchain from '../blockchain';
import validate from './validate';

describe('validate()', () => {
    let blockchain;

    beforeEach(() =>{
        //se recupera el bloque génesis
        blockchain = new Blockchain();
    });

    it('Validar cadena', () =>{
        //se instancia un nuevo bloque
        blockchain.addBlock('block-1');
        blockchain.addBlock('block-2');

        expect(validate(blockchain.blocks)).toBe(true);
    });

    it('Inalida que la cadena con bloque génesis corrupto', () =>{
        //Aquí se altera el bloque de una cadena provocando que no sea igual o esté corrupto
        blockchain.blocks[0].data = 'bad data';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('El bloque génesis es inválido');
    });


    it('Invalida a una cadena con un previousHash corrupto dentro de un bloque', () =>{
        blockchain.addBlock('Bl4ck-1');
        //Aquí se altera el bloque de una cadena provocando que no sea igual o esté corrupto
        blockchain.blocks[1].previousHash = 'hack';
        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Hash previo inválido');
    });

    it('Invalida a una cadena con un hash corrupto dentro de un bloque', () =>{
        blockchain.addBlock('Bl4ck-1');
        //Aquí se altera el bloque de una cadena provocando que no sea igual o esté corrupto
        blockchain.blocks[1].Hash = 'hack';
        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Hash inválido');
    });

});