const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

// TODO add proper validation as assignement
const courseSchema = new Schema({
    title: { type: String, required: true, unique: true, minlength: [4, 'Title must be at least 4 characters long'] },
    description: { type: String, required: true, minlength: [20, 'Description msut be at least 20 characters long'] },
    imgUrl: { type: String, required: [true, 'imgUrl required'], validate:{
        validator: (value)=> URL_PATTERN.test(value),
        message: 'Img URL is not valid'
    } },
    duration: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: String, required: true },
    enrolled: { type: [Types.ObjectId], default: [], ref: 'User' },
    enrolledCount: { type: Number, default: 0 }
});

courseSchema.index({ title: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const Course = model('Course', courseSchema);

module.exports = Course;