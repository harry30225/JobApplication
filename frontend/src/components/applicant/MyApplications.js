import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getAppliedJobs } from '../../actions/job';
import Spinner from '../layout/Spinner';

const MyApplications = ({ getAppliedJobs, job: { jobs, loading }, aprofile: { aprofile } }) => {
    useEffect(() => {
        getAppliedJobs();
    }, []);
    return (
        <Fragment>
            {loading ? <Spinner /> : (
                <Fragment>
                    <h1 >My Applications</h1>
                    {jobs.length > 0 ? (
                        <Fragment>
                            {jobs.map(job => (
                                <div className="container bg-light m-1 border border-success">
                                    <h3 className="job-title">{job.title}</h3>
                                    <p className="m-0">Recruiter Name : {job.user.name}</p>
                                    <p className="m-0">Rating : {job.rating}</p>
                                    <p className="m-0">Salary : {job.salary}</p>
                                    <p className="m-0"> Duration : {job.duration === '0' ? (<span>Indefinite</span>) : (<span>{job.duration}</span>)}</p>
                                    <p className="m-0">Deadline : <Moment format="YYYY/MM/DD">{job.deadline}</Moment></p>
                                </div>
                            ))}
                        </Fragment>
                    ) : (
                            <Fragment>
                                <h2>No Applied Jobs</h2>
                            </Fragment>
                        )}
                </Fragment>
            )}
        </Fragment>
    )
};

MyApplications.propTypes = {
    getAppliedJobs: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    aprofile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    job: state.job,
    aprofile: state.aprofile
});

export default connect(mapStateToProps, { getAppliedJobs })(MyApplications);
