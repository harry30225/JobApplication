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
    applications: [
        {
            job: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'job'
            },
            sop: {
                type: String,
            },
            rejected: {
                type: Boolean,
                default: false
            },
            accepted: {
                type: String,
                default: false
            },
            dateofjoining: {
                type: Date
            }
        }
    ],
    rating: {
        type: String,
    }
});

module.exports = Aprofile = mongoose.model('aprofile', AprofileSchema)