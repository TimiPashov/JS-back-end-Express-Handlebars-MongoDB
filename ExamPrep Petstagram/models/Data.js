const { Schema, model, Types } = require('mongoose');


const URL_PATTERN = /^https?:\/\/.+$/i;
// TODO add proper validation as assignement
const dataSchema = new Schema({
    name: { type: String, required: true, minlength: [2, 'Name must be at least 2 characters long'] },
    img: {
        type: String, required: true, validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL'
        }
    },
    age: { type: Number, required: true, min: [1, 'Age must be between 1 and 100'], max:[100, 'Age must be between 1 and 100'] },
    description: { type: String, required: true, minlength: [5, 'Description must be between 5 and 50 characters long'], maxlength:[50, 'Description must be between 5 and 50 characters long'] },
    location: { type: String, required: true, minlength: [5, 'Location must be between 5 and 50 characters long'], maxlength:[50, 'Location must be between 5 and 50 characters long'] },
    comments: { type: [Object] },
    owner: { type: Types.ObjectId, ref: 'User' }
});


const Data = model('Data', dataSchema);

module.exports = Data;