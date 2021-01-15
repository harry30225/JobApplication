const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    maxap: {
        application: {
            type: String
        },
        position: {
            type: String
        }
    },
    deadline: {
        type: Date
    },
    skills: {
        type: [String],
        required: true
    },
    typeofjob: {
        type: String,
    },
    duration: {
        type: String,
    },
    salary: {
        type: String
    },
    applications: [
        {
            applicant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            sop: {
                type: String
            },
            reject: {
                type: Boolean,
                default: false
            },
            shortlist: {
                type: Boolean,
                default: false
            }
        }
    ],
    shortlisted: [
        {
            applicant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            acccept: {
                type: Boolean,
                default: false
            },
            refect: {
                type: Boolean,
                default: false
            }
        }
    ],
    selected: [
        {
            applicant: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    rating: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Job = mongoose.model('job', JobSchema)