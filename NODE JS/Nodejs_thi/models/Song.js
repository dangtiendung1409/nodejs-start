const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Song", SongSchema);
