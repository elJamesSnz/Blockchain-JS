//import { blockchainWallet, Transaction } from "../wallet";
/*
import { Transaction, blockchainWallet } from '../wallet';

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

       return block;
    }
}

export default Miner;

*/
import { Transaction, blockchainWallet } from '../wallet';

class Miner {
  constructor(blockchain, p2pService, wallet) {
    this.blockchain = blockchain;
    this.p2pService = p2pService;
    this.wallet = wallet;
  }

  mine() {
    const {
      blockchain: { memoryPool },
      p2pService,
      wallet,
    } = this;

    if (memoryPool.transactions.length === 0) throw Error('There are no unconfirmed transactions.');

    /*
    5. broadcast wipe message to every node
    */
    memoryPool.transactions.push(Transaction.reward(wallet, blockchainWallet));
    const block = this.blockchain.addBlock(memoryPool.transactions);
    p2pService.sync();
    memoryPool.wipe();

    return block;
  }
}

export default Miner;
