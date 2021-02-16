import Elliptic from 'elliptic'; //Se importa la librería elliptic
const INITIAL_BALANCE = 100; //Balance inicial para todas las cuentas
const ec = new Elliptic.ec('secp256k1'); //tipología de parámetros para la curva
//SECP - parámetros para la curva elíptica - Standard for efficenty criptography

class Wallet{
    constructor(){
        this.balance = INITIAL_BALANCE;

        //Aquí se genera la keypair
        this.keyPair = ec.genKeyPair();
        //Se genera la clave pública a partir de la keypair usando su método get public
        //Se codifica en formato hex
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    //Método para la impresión de la Wallet
    toString(){
        const { balance, publicKey} = this;

        return `Wallet -
        publicKey ------------> ${publicKey.toString()}
        balance   ------------> ${balance}
        `;
    }

}

export { INITIAL_BALANCE };
export default Wallet;