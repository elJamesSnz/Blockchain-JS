import Wallet, { INITIAL_BALANCE } from './wallet';

describe('Test de Wallet', () => {

    let wallet;

    beforeEach(() =>{
        wallet = new Wallet();
    });

    it('Es una wallet sana no corrupta', () =>{
        expect(wallet.balance).toEqual(INITIAL_BALANCE);
        expect(typeof wallet.keyPair).toEqual('object');
        expect(typeof wallet.publicKey).toEqual('string');
        expect(wallet.publicKey.length).toEqual(130); //Curva generada convertida en hex
    });

    it('Usa sign()', () =>{
        const signature = wallet.sign('hello')
        expect(typeof signature).toEqual('object');
        expect(signature).toEqual(wallet.sign('hello'));
    }); 

});