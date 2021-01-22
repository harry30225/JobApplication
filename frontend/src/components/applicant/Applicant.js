import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/aprofile';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

const Applicant = ({ getCurrentProfile, aprofile: { aprofile, loading }, auth: { user } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return loading && aprofile === null ? (
        <Spinner />
    ) : (
            <Fragment>
                <h1>Dashboard</h1>
                <p><i className="fa fa-user"></i>Welcome {user && user.name}</p>
                {aprofile === null ? (
                    <Fragment>
                        <p>Kindly complete your profile</p>
                        <Link to="/create-aprofile" className="btn btn-info">
                            Create Profile <i className="fa fa-black-tie"></i>
                        </Link>
                    </Fragment>
                ) : (
                        <Fragment>
                            <Link to="/edit-aprofile" className="btn btn-info mb-2 mr-3">
                                Edit Profile <i className="fa fa-black-tie"></i>
                            </Link>
                            <Link to="/add-education" className="btn btn-warning mb-2 mr-3">
                                Add Education <i className="fa fa-university"></i>
                            </Link>
                            <Link to="/job-listing" className="btn btn-danger mb-2 mr-3">
                                Job Listing <i className="fa fa-briefcase"></i>
                            </Link>
                            <Link to="/my-application" className="btn btn-dark mb-2 mr-3">
                                My Applications <i className="fa fa-envelope"></i>
                            </Link>

                            <h2>Skills</h2>
                            <ul>
                                {aprofile.skills.length > 0 ? (
                                    <Fragment>
                                        {aprofile.skills.map(skill => (
                                            <li><i className="fa fa-thumbs-up"></i> {skill}</li>
                                        ))}
                                    </Fragment>
                                ) : (<Fragment></Fragment>)}

                            </ul>
                            <h2>Education</h2>
                            {aprofile.education.length > 0 ? (
                                <Fragment>
                                    {aprofile.education.map(edu => (<Fragment>
                                        <div>
                                            <i className="fa fa-university"></i>
                                            <p> <i className="fa fa-book"></i>Studied at {edu.school}</p>
                                            <p><i className="fa fa-book"></i>{edu.fieldofstudy}</p>
                                            <p><i className="fa fa-book"></i> From <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                                    {edu.to === null ? ('Current') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                                            </p>
                                        </div>
                                    </Fragment>
                                    ))}
                                </Fragment>
                            ) : (<Fragment></Fragment>)}
                        </Fragment>
                    )
                }
            </Fragment >
        )
};

Applicant.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    aprofile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    aprofile: state.aprofile
});

export default connect(mapStateToProps, { getCurrentProfile })(Applicant);
