import { elliptic, hash } from '../Tools';
import Transaction from './transaction';

const INITIAL_BALANCE = 100;
 //Balance inicial para todas las cuentas //tipología de parámetros para la curva
//SECP - parámetros para la curva elíptica - Standard for efficenty criptography
class Wallet{
    
    constructor(blockchain){
        this.balance = INITIAL_BALANCE;
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
        const {balance, blockchain: {memoryPool}} = this;
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

            //Se realiza la actualización en el memorypool
            memoryPool.addOrUpdate(tx);
        }

        return tx;
    }

}

export { INITIAL_BALANCE };
export default Wallet;