//import uuidV1 from 'uuid/V1';
import { v1 as uuidV1 } from 'uuid';
import { elliptic } from '../Tools';

const REWARD = 1;

class Transaction
{
    /*
    constructor(){
        this.id = uuidV1(); //clave generadad del método
        this.input = null;  //Bloque del sender que incluye timestamp, balance, address, firma
        this.outputs = []; // cadena que guarda el historiañ de transacciones públicas (monto y dirección)

    }
*/
    constructor() {
        this.id = uuidV1();
        this.input = null;
        this.outputs = [];
    }

    //Se crea una transacción con el balance y la llave pública del sender, 
    //dirección pública destino y el monto
    
    static create(senderwallet, recipientAddress, amount){

        //Se obtiene el balance y la llave pública del sender
        const { balance, publicKey } = senderwallet;
        
        //Si el monto es mayor al balance se manda error
        if(amount > balance) throw Error(`Monto: ${amount} excede el balance.`);

        //Se genera una instancia de transacción y se agrega en la cadena de receptores a:
        //El balance-monto y dirección del sender
        //El monto a recibir y la dirección del receptor        
        const transaction = new Transaction();
        transaction.outputs.push(...[
            { amount: balance - amount, address: publicKey },
            { amount, address: recipientAddress },
        ]);

        //Se a
        transaction.input = Transaction.sign(transaction, senderwallet);

        return transaction;
    }


    //Para verificar cualquier transacción con datos públicos
    static verify(transaction){
        //Se obtienen los siguientes datos del objeto transacción
        const { input: {address, signature}, outputs} = transaction;

        //Se verifica que la firma coincida mandando nuevamente los datos
        return elliptic.verifySignature(address, signature, outputs);
        
    }

    //método que retorna la firma en base al registro/historial previo de transacciones
    static sign(transaction, senderwallet){
        /*
        return {
            //Valores a introducir: timestamp, monto, dirección del que envia, firma
            timestamp: Date.now(),
            amount: senderwallet.balance,
            address: senderwallet.publicKey,
            signature: senderwallet.sign(transaction.outputs),
            //lo retorna como objeto
        };
        */
       return {
        timestamp: Date.now(),
        amount: senderwallet.balance,
        address: senderwallet.publicKey,
        signature: senderwallet.sign(transaction.outputs),
      };
    }

        
    //Se actualiza el historial de transacciones
    update(senderwallet, recipientaddress, amount){        

        //Valida que la dirección se encuentro dentro de la lista de receptores
        const senderOutput = this.outputs.find((output) => output.address === senderwallet.publicKey);

        //Se comprueba que el monto no exceda
        if(amount > senderOutput.amount) throw Error(`Monto en output: ${amount} excede el balance.`);

        //Actualiza el monto del sender
        senderOutput.amount = senderOutput.amount - amount;
        //Agrega a la lista de receptores el monto y dirección
        this.outputs.push({ amount, address: recipientaddress });
        //Al ser un objeto de instancia, this, sirve para realizar el input de la misma transaccion que generamos
        this.input = Transaction.sign(this, senderwallet);

        //devuelve la transacción actualizada
        return this;
    }


    static reward(minerWallet, blockchainWallet){
        return this.create(blockchainWallet, minerWallet.publicKey, REWARD);
    }
}

export { REWARD };
export default Transaction;