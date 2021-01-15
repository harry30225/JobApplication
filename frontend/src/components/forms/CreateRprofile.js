import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/rprofile';


const CreateRprofile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        contactno: '',
        bio: ''
    });

    const { contactno, bio } = formData;

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
            <h1> Create Profile</h1>
            <p>Complete your profile</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Contact No" name="contactno" value={contactno} onChange={e => onChange(e)} />
                    <small>Contact No.</small>
                </div>
                <div className="form-group">
                    <div className="form-group">
                        <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                        <small> Your Short Bio</small>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary m-1" value="CreateProfile" />
                <Link className="btn btn-light m-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
};

CreateRprofile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateRprofile));
