import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/aprofile';


const EditAprofile = ({ aprofile: { aprofile, loading }, getCurrentProfile, createProfile, history }) => {
    const [formData, setFormData] = useState({
        skills: '',
    });

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            skills: loading || !aprofile.skills ? '' : aprofile.skills.join(',')
        });
    }, [loading, getCurrentProfile]);

    const { skills } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        createProfile(formData, history);
    };

    return (
        <Fragment>
            <h1> Edit Profile</h1>
            <p>Add more Skills</p>
            <h3>Skills</h3>
            <u>
                <li><i className="fa fa-tag">JavaScript</i></li>
                <li><i className="fa fa-tag">Python</i></li>
                <li><i className="fa fa-tag">React</i></li>
                <li><i className="fa fa-tag">MongoDb</i></li>
                <li><i className="fa fa-tag">CSS</i></li>
                <li><i className="fa fa-tag">DotNet</i></li>
                <li><i className="fa fa-tag">Angular</i></li>
                <li><i className="fa fa-tag">Select from these or add your more skills</i></li>
            </u>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
                </div>
                <input type="submit" className="btn btn-primary m-1" value="EditProfile" />
                <Link className="btn btn-light m-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
};

EditAprofile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    aprofile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    aprofile: state.aprofile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditAprofile));
