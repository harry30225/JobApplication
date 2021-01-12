const mongoose = require('mongoose');

const AprofileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    skills: {
        type: [String],
        required: true
    },
    education: [
        {
            school: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
        }
    ],
    rating: {
        type: String,
    }
});

module.exports = Aprofile = mongoose.model('aprofile', AprofileSchema)