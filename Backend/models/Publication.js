const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    createdDate: {type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model('Publication', publicationSchema);