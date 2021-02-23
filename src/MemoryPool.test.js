import MemoryPool from './MemoryPool';
import Wallet, {Transaction} from './wallet/'

describe('MemoryPool', () => {
    let memoryPool;
    let wallet;
    let transaction;

    beforeEach(() =>{
        memoryPool = new MemoryPool();
        wallet = new Wallet();
        transaction = new Transaction.create(wallet, 'memoryPool-address', 5);
        memoryPool.addOrUpdate(transaction);
    });

    it('Tiene una transacción en el memorypool', () =>{
        //Obtiene la longitud
        expect(memoryPool.transactions.length).toEqual(1);
    });

    it('Agrega una transacción en el memorypool', () =>{
        //Busca la transacción
        const found = memoryPool.transactions.find(({ id }) => id === transaction.id);
        expect(found).toEqual(transaction);
    });

    it('Actualiza una transacción en el memorypool', () =>{
        const txOld = JSON.stringify(transaction);
        const txtNew = transaction.update(wallet, 'ether-address',10)
        memoryPool.addOrUpdate(txtNew); //como es la misma wallet

        expect(memoryPool.transactions.length).toEqual(1);

        //Busca la transacción
        const found = memoryPool.transactions.find(({ id }) => id === transaction.id);

        //Debe de encontrar más movimientos en el registro que como estaba previamente
        expect(JSON.stringify(found)).not.toEqual(txOld);

        //La transacción actualizada debe ser igual a la que se encuentra en el registro
        expect(txtNew).toEqual(found);

    });

});