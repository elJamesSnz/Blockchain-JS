import { Transaction } from './wallet'

class MemoryPool{
    //Recibe una transacción que verificará si se encuentra en memoria
    //Si no está, la almacena, si no, la descarta
    constructor(){
        this.transactions = [];
    }


    addOrUpdate(transaction){

        const { input, outputs = []} = transaction;

        //Obtiene el total de valores de ouputs
        const outputTotal = outputs.reduce((total, output) => total + output.amount, 0);
        if(input.amount !== outputTotal) throw Error (`Transacción inváldia de ${input.address}`);
        if(!Transaction.verify(transaction)) throw Error (`Firma inváldia de ${input.address}`);

        //Se busca en index la transacción con el ID
        const txIndex = this.transactions.findIndex(({ id }) => id === transaction.id);
        if(txIndex >= 0) this.transactions[txIndex] = transaction; //se 'descarta'
        else this.transactions.push(transaction); //se agrega
    }

    find(address){
        //Se busca una transacción con la dirección pública
        return this.transactions.find(({ input }) => input.address === address);
    }

    wipe(){
        this.transactions = [];
    }
}

export default MemoryPool;