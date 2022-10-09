const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    createdDate: {type: Date },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    comment: { type: [{
            commenterId: { type: String },
            commenterName: { type: String },
            text: { type: String },
            createdAt: Date
            }
        ]
    }
});

module.exports = mongoose.model('Publication', publicationSchema);