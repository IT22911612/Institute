const mongoose = require("mongoose");

const marksSchema = mongoose.Schema({
    grade: String,
    subject: String,
    mark: String,
}, {
    timestamps: true
});

const marksModel = mongoose.model("marks", marksSchema);

module.exports = marksModel;
