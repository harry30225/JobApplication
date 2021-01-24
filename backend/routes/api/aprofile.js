const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Aprofile = require('../../models/Aprofile');
const User = require('../../models/User');
const Job = require('../../models/Job');
const { findById } = require('../../models/Aprofile');

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

// @route       GET api/aprofile/aprofiles/recruiter
// @desc        get all aprofiles accepted by recruiter
// @access      private

router.get('/aprofiles/recruiter', auth, async (req, res) => {
    try {
        let jobs = await Job.find({ user: req.user.id });
        let aprofiles = await Aprofile.find().populate('user', ['name', 'email']);
        aprofiles = aprofiles.filter(function (aprofile) {
            for (i = 0; i < jobs.length; i++) {
                if (aprofile.applications.filter(app => app.job.toString() === jobs[i]._id.toString() && app.accepted === true).length > 0) {
                    return true
                }
            }
            return false
        });

        res.json(aprofiles);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       GET api/aprofile/aprofiles/job/:jobId
// @desc        get all aprofiles with given jobId
// @access      private

router.get('/aprofiles/job/:jobId', auth, async (req, res) => {
    try {
        let aprofiles = await Aprofile.find().populate('user', ['name', 'email']);
        aprofiles = aprofiles.filter(function (aprofile) {
            if (aprofile.applications.filter(app => app.job.toString() === req.params.jobId).length > 0) {
                return true;
            }
            else {
                return false;
            }
        });
        res.json(aprofiles);
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
        id,
        sop
    } = req.body;

    const newJob = {
        job: id,
        rejected: false,
        shortlisted: false,
        accepted: false,
        dateofapplication: Date.now(),
        dateofjoining: null,
        sop: sop
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


// @route       PUT api/aprofile/job/reject/:jobId/:aprofileId
// @desc        Reject Job application
// @access      private

router.put('/job/reject/:jobId/:aprofileId', auth, async (req, res) => {
    try {
        const aprofile = await Aprofile.findById(req.params.aprofileId);
        const jobIndex = aprofile.applications.findIndex(function (app) {
            return app.job.toString() === req.params.jobId
        })
        if (jobIndex === -1) {
            return res.status(404).json({ msg: 'No Job Found' });
        }
        aprofile.applications[jobIndex].rejected = true;
        aprofile.applications[jobIndex].shortlisted = false;
        aprofile.applications[jobIndex].accepted = false;

        const job = await Job.findById(req.params.jobId);
        const appIndex = job.applications.findIndex(function (app) {
            return app.applicant.toString() === aprofile.user.toString()
        })

        if (appIndex === -1) {
            return res.status(404).json({ msg: 'No Applicant found' });
        }
        job.applications[appIndex].reject = true;
        job.applications[appIndex].shortlist = false;
        job.applications[appIndex].accepted = false;

        await aprofile.save();
        await job.save();
        res.json({ msg: 'Application Rejected' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/aprofile/job/shortlist/:jobId/:aprofileId
// @desc        Shortlist Job application
// @access      private

router.put('/job/shortlist/:jobId/:aprofileId', auth, async (req, res) => {
    try {
        const aprofile = await Aprofile.findById(req.params.aprofileId);
        const jobIndex = aprofile.applications.findIndex(function (app) {
            return app.job.toString() === req.params.jobId
        })
        if (jobIndex === -1) {
            return res.status(404).json({ msg: 'No Job Found' });
        }
        aprofile.applications[jobIndex].rejected = false;
        aprofile.applications[jobIndex].shortlisted = true;
        aprofile.applications[jobIndex].accepted = false;

        const job = await Job.findById(req.params.jobId);
        const appIndex = job.applications.findIndex(function (app) {
            return app.applicant.toString() === aprofile.user.toString()
        })

        if (appIndex === -1) {
            return res.status(404).json({ msg: 'No Applicant found' });
        }
        job.applications[appIndex].reject = false;
        job.applications[appIndex].shortlist = true;
        job.applications[appIndex].accepted = false;

        await aprofile.save();
        await job.save();
        res.json({ msg: 'Application Shortlisted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route       PUT api/aprofile/job/Accept/:jobId/:aprofileId
// @desc        Accept Job application
// @access      private

router.put('/job/accept/:jobId/:aprofileId', auth, async (req, res) => {
    try {
        const aprofile = await Aprofile.findById(req.params.aprofileId);
        const jobIndex = aprofile.applications.findIndex(function (app) {
            return app.job.toString() === req.params.jobId
        })
        if (jobIndex === -1) {
            return res.status(404).json({ msg: 'No Job Found' });
        }
        aprofile.applications[jobIndex].rejected = false;
        aprofile.applications[jobIndex].shortlisted = false;
        aprofile.applications[jobIndex].accepted = true;
        aprofile.applications[jobIndex].dateofjoining = Date.now();

        const job = await Job.findById(req.params.jobId);
        const appIndex = job.applications.findIndex(function (app) {
            return app.applicant.toString() === aprofile.user.toString()
        })

        if (appIndex === -1) {
            return res.status(404).json({ msg: 'No Applicant found' });
        }
        job.applications[appIndex].reject = false;
        job.applications[appIndex].shortlist = false;
        job.applications[appIndex].accepted = true;

        await aprofile.save();
        await job.save();
        res.json({ msg: 'Application Rejected' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;