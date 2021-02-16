import Wallet, { INITIAL_BALANCE } from './wallet';

describe('Test de Wallet', () => {

    let wallet;

    beforeEach(() =>{
        wallet = new Wallet();
    });

    it('Es una wallet sana no corrupta', () =>{
        expect(wallet.balance).toEqual(INITIAL_BALANCE);
    });

});