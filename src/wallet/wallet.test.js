import Wallet, { INITIAL_BALANCE } from './wallet';
import Blockchain from '../blockchain';

describe('Test de Wallet', () => {

    let wallet;
    let blockchain;

    beforeEach(() =>{
       
        blockchain = new Blockchain();
        wallet = new Wallet(blockchain);
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

    describe('Creando una transacción', () =>{

        let tx;
        let recipientAddress;
        let amount;

        beforeEach(() =>{
    
            recipientAddress = 'random-address'
            amount = 5;
            tx = wallet.createTransaction(recipientAddress, amount);
        });

        describe('Se raliza la misma transacción', () =>{    
            beforeEach(() =>{        
                tx = wallet.createTransaction(recipientAddress, amount);
            });

            it('Se duplica el monto sustraído del balance de la wallet', () =>{
                const output = tx.outputs.find(({address}) => address === wallet.publicKey);
                expect(output.amount).toEqual(wallet.balance - (amount*2));
            });

            it('Se clona el monto de salida del receptor', () =>{
                //Se genera array que contenga ambos montos
                //Hay balancefinal, 2 transacciones
                const amounts = tx.outputs
                .filter(({address}) => address === recipientAddress)
                .map(output => output.amount);

                expect(amounts).toEqual([amount, amount]);

            });
        });

        describe('Se calcula el balance', () =>{    
            let addBalance;
            let times;
            let senderWallet;

            beforeEach(() =>{        
                addBalance = 16;
                times = 3;
                senderWallet = new Wallet(blockchain);
            });        
            
            for(let i=0; i<times; i++){
                senderWallet.createTransaction(wallet.publicKey, addBalance);
            }
        });
        
    });

});