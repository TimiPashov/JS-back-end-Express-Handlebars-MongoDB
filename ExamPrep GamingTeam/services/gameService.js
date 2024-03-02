const Game = require('../models/Game');

async function getAll(search) {
    if (search) {
        return Game.find({ $or: [{ name: new RegExp(search, 'i') }, { platform: new RegExp(search, 'i') }] }).lean();
    }
    return Game.find({}).lean();
}

async function searchByTwoCriteria(search1, search2) {
    return Game.find({ name: new RegExp(search1, 'i'), platform: new RegExp(search2, 'i') }).lean();
}

async function getById(id) {
    return Game.findById(id).lean();
}

async function createGame(data) {
    return Game.create(data);
}

async function editGame(id, data) {
    const existing = await Game.findById(id);
    existing.name = data.name;
    existing.img = data.img;
    existing.price = data.price;
    existing.description = data.description;
    existing.platform = data.platform;
    existing.genre = data.genre
    return existing.save();
}

async function deleteGame(id) {
    return await Game.findByIdAndRemove(id);

}

async function buyGame(gameId, userId) {
    const game = await Game.findById(gameId);
    game.boughtBy.push(userId);
    return game.save();
}

module.exports = {
    getAll,
    getById,
    createGame,
    editGame,
    deleteGame,
    searchByTwoCriteria,
    buyGame
}