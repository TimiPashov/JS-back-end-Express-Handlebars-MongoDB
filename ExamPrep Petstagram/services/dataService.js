const Data = require('../models/Data');

async function getAll(search) {
    if (search) {
        return Data.find({ $or: [{ name: new RegExp(search, 'i') }, { platform: new RegExp(search, 'i') }] }).lean();
    }
    return Data.find({}).lean();
}

async function getByOwner(id) {
    return Data.find({ owner: id }).lean();
}

async function searchByTwoCriteria(search1, search2) {
    return Data.find({ name: new RegExp(search1, 'i'), platform: new RegExp(search2, 'i') }).lean();
}

async function getById(id) {
    return Data.findById(id).lean();
}

async function createData(data) {
    return Data.create(data);
}

async function editData(id, data) {
    const existing = await Data.findById(id);
    existing.name = data.name;
    existing.img = data.img;
    existing.age = data.age;
    existing.description = data.description;
    existing.location = data.location;
    return existing.save();
}

async function deleteData(id) {
    return await Data.findByIdAndRemove(id);

}

async function commentData(dataId, comment) {
    const data = await Data.findById(dataId);
    data.comments.push(comment);
    return data.save();
}

module.exports = {
    getAll,
    getById,
    createData,
    editData,
    deleteData,
    getByOwner,
    commentData
}