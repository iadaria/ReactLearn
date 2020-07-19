const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    title: { type: String, require: true, maxlength: 128 },
    jobTitle: { type: String, require: true },
    description: { type: String, require: true },
    company: { type: String, require: true, maxlength: 128 },
    companyWebsite: { type: String, require: true, maxlength: 128 },
    location: { type: String, require: true, maxlength: 128 },
    startDate: { type: Date, require: true },
    endDate: Date,
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },

    category: {
        enum: ["work", "learn"],
        type: String,
        required: true,
        default: "learn"
    },
    repository: String,
    deploy: String,
    taskDocument: String,
    imgName: String,
    technologies: String,
    languages: String,
    technologyImgs: String,
});

module.exports = mongoose.model('Portfolio', portfolioSchema);