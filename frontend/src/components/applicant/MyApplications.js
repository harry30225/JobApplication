import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getAppliedJobs } from '../../actions/job';
import RateJob from './RateJob';
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
                                    {aprofile.applications.map(app => app.job === job._id && <Fragment>
                                        {app.rejected === false && app.shortlisted === false && app.accepted === false && <Fragment>
                                            <p className="m-0">Status : Pending</p>
                                        </Fragment>}
                                        {app.rejected === true && app.shortlisted === false && app.accepted === false && <Fragment>
                                            <p className="m-0">Status : Rejected</p>
                                        </Fragment>}
                                        {app.rejected === false && app.shortlisted === true && app.accepted === false && <Fragment>
                                            <p className="m-0">Status : Shortlisted</p>
                                        </Fragment>}
                                        {app.rejected === false && app.shortlisted === false && app.accepted === true && <Fragment>
                                            <p className="m-0">Status : Accepted</p>
                                            <p>Date of Joining : <Moment format="YYYY/MM/DD">{app.dateofjoining}</Moment></p>
                                            {/* Rate the Job */}
                                            <RateJob JobId={job._id} />
                                        </Fragment>}
                                    </Fragment>)}
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
