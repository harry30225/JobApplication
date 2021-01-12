const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Job = require('../../models/Job');
const User = require('../../models/User');

// @route       GET api/job
// @desc        GET all jobs
// @access      Public
router.get('/', async (req, res) => {
    try {
        const Jobs = await Job.find().populate('user', ['name , email']);
        res.json(Jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route      POST api/job
// @desc       POST a job
// @access     Private
router.post('/', [auth, [
    check('title', 'Title is Required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
    check('typeofjob', 'Type of Job is required').not().isEmpty(),
    check('salary').not().isEmpty(),
    check('duration').not().isEmpty().isIn(['0', '1', '2', '3', '4', '5', '6'])

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        title,
        application,
        positon,
        deadline,
        skills,
        typeofjob,
        duration,
        salary,
    } = req.body;

    const jobFields = {};
    jobFields.user = req.user.id;
    if (title) jobFields.title = title;
    if (deadline) jobFields.deadline = deadline;
    if (typeofjob) jobFields.typeofjob = typeofjob;
    if (duration) jobFields.duration = duration;
    if (salary) jobFields.salary = salary;
    jobFields.maxap = {}
    if (application) jobFields.maxap.application = application;
    if (positon) jobFields.maxap.position = position;
    if (skills) {
        jobFields.skills = skills.split(',').map(skills => skills.trim());
    }

    try {
        let job = await Job.findOne({ user: req.user.id });
        if (job) {
            job = await Job.findOneAndUpdate(
                { user: req.user.id },
                { $set: jobFields },
                { new: true }
            );
            return res.json(job);
        }

        job = new Job(jobFields);
        await job.save();
        return res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;