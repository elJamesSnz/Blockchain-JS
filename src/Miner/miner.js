//import { blockchainWallet, Transaction } from "../wallet";

import { Transaction, blockchainWallet } from '../wallet';
import { MESSAGE } from '../service/p2p'

class Miner{
    //wallet del minero para darle el reward
    constructor(blockchain, p2pService, wallet){
        this.blockchain = blockchain;
        this.p2pService = p2pService;
        this.wallet = wallet;
    }

    mine(){
        const {
            blockchain: { memoryPool },
            p2pService,
            wallet,
        } = this;

        if(memoryPool.transactions.length === 0) throw Error('No hay transacciones sin confirmar');


        //Agregar a las transacciones del memory pool el reward
        memoryPool.transactions.push(Transaction.reward(wallet, blockchainWallet));
        //agregando bloques a la blockchain
        const block = this.blockchain.addBlock(memoryPool.transactions);
        //Sincronizando la nueva blockcchain a través de p2pService
        p2pService.sync();
        //Se borran las transacciones del memory pool
        memoryPool.wipe();

        p2pService.broadcast(MESSAGE.WIPE);

       return block;
    }
}

export default Miner;
