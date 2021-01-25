import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/rprofile';
import Spinner from '../layout/Spinner';

const Recruiter = ({ getCurrentProfile, rprofile: { loading, rprofile }, auth: { user } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return loading && rprofile === null ? (
        <Spinner />
    ) : (
            <Fragment>
                <h1>Dashboard</h1>
                <p><i className="fa fa-user"></i>Welcome {user && user.name}</p>
                {rprofile === null ? (
                    <Fragment>
                        <p>Kindly complete your profile</p>
                        <Link to="/create-rprofile" className="btn btn-info">
                            <i className="fa fa-user"></i> Create Profile
                        </Link>
                    </Fragment>
                ) : (
                        <Fragment>
                            <Link to="/create-rprofile" className="btn btn-info m-2">
                                <i className="fa fa-user"></i> Edit Profile
                        </Link>
                            <Link to="/add-job" className="btn btn-danger m-2">
                                <i className="fa fa-briefcase"></i> Add a Job
                            </Link>
                            <Link to="/rec-job-listing" className="btn btn-primary m-2">
                                <i className="fa fa-folder"></i> Jobs and Applications
                            </Link>
                            <Link to="/selected-applicants" className="btn btn-dark m-2">
                                <i className="fa fa-envelope"></i> Selected Applicants
                            </Link>
                            <p className="m-2"><i className="fa fa-info"> Contact No. : {rprofile.contactno}</i></p>
                            <p className="m-2"><i className="fa fa-info"></i> Bio : {rprofile.bio}</p>
                        </Fragment>
                    )}
            </Fragment>
        )
};

Recruiter.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    rprofile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    rprofile: state.rprofile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Recruiter);
