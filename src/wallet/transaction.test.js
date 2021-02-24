import Transaction, { REWARD } from './transaction'
import Wallet from './wallet'
import { blockchainWallet } from './index'

describe('Se hace transacción', () =>{
    let wallet;
    let transaction;
    let amount;
    let recipientAddress;

    beforeEach(() =>{
        wallet = new Wallet();
        recipientAddress = 'r3c1p13nt'
        amount = 5; //se le restará 5 al balance inicial que por default es 100
        transaction = Transaction.create(wallet, recipientAddress, amount);        
    });

    it('Se hace un output del monto sustraido del balance de la wallet', () =>{
        const output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
        expect(output.amount).toEqual(wallet.balance - amount);
    });

    it('Se hace un output del monto agregado del balance de la wallet', () =>{
        const output = transaction.outputs.find(({ address }) => address === recipientAddress);
        expect(output.amount).toEqual(amount);
    });

    describe('Transacciones con montos que exceden el balance', () =>{
        beforeEach(() => {
            amount = 500;
        });

        it('No se crea la transacción', () =>{
            expect(() =>{
                transaction = new Transaction.create(wallet, recipientAddress, amount)
            }).toThrowError(`Monto: ${amount} excede el balance.`);
        });

    });

    it('Inputs de balance de la wallet', () =>{
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it('Inputs de sender address de la wallet', () =>{
        expect(transaction.input.address).toEqual(wallet.publicKey);
    });

    it('Inputs tiene una firma usando la wallet', () =>{
        expect(typeof transaction.input.signature).toEqual('object');
        expect(transaction.input.signature).toEqual(wallet.sign(transaction.outputs));
    });
    
    it('Validar una transacción válida', () =>{
        expect(Transaction.verify(transaction)).toBe(true);
    });  

    it('Invalida una transacción corrompida', () =>{
        transaction.outputs[0].amount = 500; //se intenta corromper el historial de ouputs/transacciones
        expect(Transaction.verify(transaction)).toBe(false);
    });

    describe('Actualizando una transacción', () =>{
        let nextAmount;
        let nextRecipient;

        beforeEach(() => {
            nextAmount = 3;
            nextRecipient = 'n3xt-4ddr3s';
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });

        it('Se resta el monto nextamount de la wallet del sender', () =>{
           const output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
           expect(output.amount).toEqual(wallet.balance - amount - nextAmount);
        });

        it('Se muestra el monto para un recipient', () => {
            const output = transaction.outputs.find(({ address }) => address === nextRecipient);
            expect(output.amount).toEqual(nextAmount);
          });

    });

    describe('Creando una transacción de REWARD', () =>{
        //Se crea la transacción
        beforeEach(() => {            
            transaction = Transaction.reward(wallet, blockchainWallet);
        });

        it('reward', () => {
            expect(transaction.outputs.length).toEqual(2);
            let output = transaction.outputs.find(({ address }) => address === wallet.publicKey);
            expect(output.amount).toEqual(REWARD);

            output = transaction.outputs.find(({ address }) => address === blockchainWallet.publicKey);
            expect(output.amount).toEqual(blockchainWallet.balance - REWARD);
        });

    });

});