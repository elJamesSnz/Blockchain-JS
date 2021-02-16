import { SHA256 } from 'crypto-js';
//retorna el valor de sha256 acorde a los datos proporcionados
export default (data) => SHA256(JSON.stringify(data)).toString();

