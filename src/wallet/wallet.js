
import Transaction from './transaction';
import { elliptic, hash } from '../Tools';

const INITIAL_BALANCE = 100;
 //Balance inicial para todas las cuentas //tipología de parámetros para la curva
//SECP - parámetros para la curva elíptica - Standard for efficenty criptography
class Wallet{
    
    constructor(blockchain, newbalance){        
        this.balance = INITIAL_BALANCE;
        if(newbalance){ //si está definido, lo cambia al que se envió
            this.balance = newbalance;
        }
        //Aquí se genera la keypair
        this.keyPair = elliptic.createKeyPair();
        //Se genera la clave pública a partir de la keypair usando su método get public
        //Se codifica en formato hex
        this.publicKey = this.keyPair.getPublic().encode('hex');
        this.blockchain = blockchain;
    }

    //Método para la impresión de la Wallet
    toString(){
        const { balance, publicKey} = this;

        return `Wallet -
        publicKey ------------> ${publicKey.toString()}
        balance   ------------> ${balance}
        `;
    }

    //método para firmar cualquier tipo de dato
    sign(data){

        return this.keyPair.sign(hash(data));
    }

    createTransaction(recipientAddress, amount){
        //Se descompone el balance y su blockchain de esta instancia de wallet
        const { blockchain: {memoryPool}} = this;
        const balance = this.calculateBalance();
        //Se verifica que sea un monto válido
        if(amount > balance) throw Error(`Monto ${amount} excede el balance ${balance}`);
        
        //Se busca la transacción en base a una dirección pública
        let tx = memoryPool.find(this.publicKey);

        //Si existe, actualiza
        if(tx){
            tx.update(this, recipientAddress, amount);
        }
        else{
            //Si no existe, se crea una nueva transacción enviando:
            //esta instancia de wallet, dirección del receptor y monto
            tx = Transaction.create(this, recipientAddress, amount);
            console.log(tx);
            //Se realiza la actualización en el memorypool
            memoryPool.addOrUpdate(tx);
        }

        return tx;
    }

    calculateBalance(){
        const { blockchain: { blocks = []}, publicKey} = this;
        let { balance } = this;
        let timestamp = 0;
        const txs = []; //transacciones que se han tenido en nuestra blockchain

        blocks.forEach(( { data = []}) => {
            if(Array.isArray(data)) data.forEach((tx) => txs.push(tx)); 
        });


        const walletInputs = txs.filter((tx) => tx.input.address === publicKey);

        if(walletInputs.length > 0 ){
            const recentInputTx = walletInputs
                .sort((a, b) => a.input.timestamp - b.input.timestamp)
                .pop(); //para sacar el ultimo elemento

            balance = recentInputTx.outputs.find(({ address }) => address === publicKey).amount;
            timestamp = recentInputTx.input.timestamp;
        }

        txs
        .filter(({ input }) => input.timestamp > timestamp)
        .forEach(({ outputs }) => {
            outputs.find(({address, amount}) =>{
                if(address === publicKey) balance += amount;
            });
        });

        return balance;
    }

}

export { INITIAL_BALANCE };
export default Wallet;

