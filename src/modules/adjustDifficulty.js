const MINE_RATE = 3000;

export default (prevousBlock, timestamp) => {
    const { difficulty } = prevousBlock;

    return prevousBlock.timestamp + MINE_RATE > timestamp
    ? difficulty + 1
    : difficulty -1;
};