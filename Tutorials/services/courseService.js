
const Course = require("../models/Course")

async function getAllByDate(search) {
    const query = {};
    if (search) {
        query.title = new RegExp(search, 'i');
        return Course.find(query).sort({ createdAt: 1 }).lean();
    }
    return Course.find(query).sort({ createdAt: 1 }).lean();

}

async function getRecent() {
    return Course.find({}).sort({ enrolledCount: -1 }).limit(3).lean();
}


async function getCourseById(courseId) {
    return Course.findById(courseId).lean()
}

async function createCourse(course) {
    const existing = await Course.findOne({ title: course.title }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Course name is taken');
    }
    let date = new Date(Date.now());
    const day = date.toDateString().slice(0, 15);
    const time = date.toLocaleTimeString();
    date = `${day} ${time}`;
    console.log(date)
    const result = await Course.create({
        title: course.title,
        description: course.description,
        imgUrl: course.imgUrl,
        duration: course.duration,
        owner: course.owner,
        createdAt: date,
        enrolled: course.enrolled,

    });
    return result;
}

async function editCourse(courseId, data) {
    const existing = await Course.findById(courseId);

    existing.title = data.title;
    existing.description = data.description;
    existing.imgUrl = data.imgUrl;
    existing.duration = data.duration;
    return existing.save();
}

async function deleteCourse(courseId) {
    console.log(courseId)
    return await Course.findByIdAndDelete(courseId);
};

async function enrollCourse(courseId, userId) {
    const existing = await Course.findById(courseId);
    existing.enrolled.push(userId);
    existing.enrolledCount = Number(existing.enrolled.length);
    return existing.save();
}

module.exports = {
    getCourseById,
    createCourse,
    editCourse,
    deleteCourse,
    enrollCourse,
    getAllByDate,
    getRecent
}