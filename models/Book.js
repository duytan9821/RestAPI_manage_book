const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

    id: { type: Number, required: true },
    story: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    left: { type: Number, required: true },
    description: { type: [String], required: true }
});

module.exports = mongoose.model("book", bookSchema);


