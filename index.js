import PKG from './package.json'; //importa el json
import Block from './src/block';

const {name, version} = PKG;


const{genesis} = Block;
console.log(genesis.toString());

const block = new Block(Date.now(), genesis.Hash, 'bloque 1', 'soy el bloque 1');
console.log(block.toString());

const block2 = new Block(Date.now(), block.Hash, 'bloque 2', 'soy el bloque 2');
console.log(block2.toString());