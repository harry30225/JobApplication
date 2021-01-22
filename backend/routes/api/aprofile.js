const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Aprofile = require('../../models/Aprofile');
const User = require('../../models/User');

// @route       GET api/aprofile/me
// @desc        GET Current User (applicant) Profile
// @access      Private

router.get('/me', auth, async (req, res) => {
    try {
        const aprofile = await Aprofile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);

        if (!aprofile) {
            return res.status(400).json({ msg: 'There is no profile for this applicant' });
        }
        res.json(aprofile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       POST api/aprofile/skills
// @desc        POST Add applicant skills
// @access      Private

router.post('/skills', [auth, [
    check('skills').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { skills } = req.body;

    const aprofileFields = {};
    aprofileFields.user = req.user.id;
    if (skills) {
        aprofileFields.skills = skills.split(',').map(skills => skills.trim());
    }

    try {
        let aprofile = await Aprofile.findOne({ user: req.user.id });

        if (aprofile) {
            //Update 
            aprofile = await Aprofile.findOneAndUpdate(
                { user: req.user.id },
                { $set: aprofileFields },
                { new: true }
            );
            return res.json(aprofile);
        }
        aprofileFields.rating = '0';
        // Create
        aprofile = new Aprofile(aprofileFields);
        await aprofile.save()
        return res.json(aprofile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/aprofile/education
// @desc        add profile education
// @access      private

router.put('/education', [auth, [
    check('school', 'school is required.').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
    check('fieldofstudy', 'field of study is required').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    const {
        school,
        fieldofstudy,
        from,
        to,
        current,
    } = req.body;

    const newEdu = {
        school,
        fieldofstudy,
        from,
        to,
        current,
    }
    try {
        const aprofile = await Aprofile.findOne({ user: req.user.id });
        if (!aprofile) {
            return res.status(404).json({ msg: "Profile not found" });
        }
        aprofile.education.unshift(newEdu);

        await aprofile.save();
        return res.json(aprofile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route       PUT api/aprofile/application
// @desc        add profile application
// @access      private

router.put('/application', auth, async (req, res) => {
    const {
        id
    } = req.body;

    const newJob = {
        job: id,
        rejected: false,
        shortlisted: false,
        accepted: false
    }
    try {
        const aprofile = await Aprofile.findOne({ user: req.user.id });
        if (!aprofile) {
            return res.status(404).json({ msg: "Profile not found" });
        }
        aprofile.applications.unshift(newJob);

        await aprofile.save();
        return res.json(aprofile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;