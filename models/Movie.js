const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: [String], required: true },
    rating: { type: Number, required: true }

    //   id: {type: Number, required: true},
    //   story: {type: String, required: true},
    //   author: {type: String, required: true},
    //   title: {type: String, required: true},
    //   category: {type: String, required: true},
    //   left: {type: Number, required: true},
    //   description: {type: String, required: true}
});

module.exports = mongoose.model("movie", movieSchema);


