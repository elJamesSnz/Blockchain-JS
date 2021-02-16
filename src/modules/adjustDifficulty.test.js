import adjustDifficulty from './adjustDifficulty';

describe('Se ajusta dificultad', () => {
    let block;
    beforeEach(() => {
        block = { timestamp: Date.now(), difficulty: 3};
    });

    it('Se disminuye dificultad por bloques minados lentos', () =>{
        //El calculo de dificultad es mucho mayor
        expect(adjustDifficulty(block, block.timestamp + 60000)).toEqual(block.difficulty - 1);
    });

    it('Se aumenta dificultad por bloques minados rápidos', () =>{
        //El calculo de dificultad es mucho mayor
        expect(adjustDifficulty(block, block.timestamp + 1000)).toEqual(block.difficulty + 1);
    });

});