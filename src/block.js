class Block{
    constructor(timestamp, previousHash, Hash, data) //Método constructor
    {
        this.timestamp  = timestamp;
        this.previousHash  = previousHash;
        this.Hash  = Hash;
        this.data  = data;
    }

    static get genesis(){ //genera instancia del nodo bloque
        const timestamp = (new Date(2021, 0, 1).getTime());
        return new this(timestamp, undefined, 'bloque 0', 'genesis');
    }

    toString(){
        const{
            timestamp, previousHash, Hash, data
        } = this;

        return `Block -
        timestamp ---------> ${timestamp}
        previousHash ---------> ${previousHash}
        Hash ---------> ${Hash}
        data ---------> ${data}        
        `;
    }
}

export default Block; //Se exporta la clase