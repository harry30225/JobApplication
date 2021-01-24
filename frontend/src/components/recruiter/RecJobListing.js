import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMadeJobs, deleteJob } from '../../actions/job';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';

const RecJobListing = ({ getMadeJobs, deleteJob, job: { jobs, loading } }) => {
    useEffect(() => {
        getMadeJobs();
    }, []);
    return (
        <Fragment>
            {loading ? <Spinner /> : (
                <Fragment>
                    <h1 >Jobs and Applications</h1>
                    {jobs.length > 0 ? (
                        <Fragment>
                            {jobs.map(job => (
                                <div className="container bg-light m-1 border border-success">
                                    <Link to={`/job-applicants/${job._id}`}><h3 className="job-title">{job.title}</h3></Link>
                                    <p className="m-0">Salary : {job.salary}</p>
                                    <p className="m-0">Date of Posting : <Moment format="YYYY/MM/DD">{job.date}</Moment></p>
                                    <p className="m-0"> Duration : {job.duration === '0' ? (<span>Indefinite</span>) : (<span>{job.duration} Month</span>)}</p>
                                    <p className="m-0">Deadline : <Moment format="YYYY/MM/DD">{job.deadline}</Moment></p>
                                    <p className="m-0">Number of Applicants : {job.applications.filter(app => app.reject === false).length}</p>
                                    <p className="m-0">Maximum of Applications : {job.maxap.application}</p>
                                    <Link to={`/edit-job/${job._id}`} className="btn btn-info m-1">Edit job</Link>
                                    <Link onClick={() => deleteJob(job._id)} className="btn btn-danger m-1">Delete Job</Link>
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

RecJobListing.propTypes = {
    getMadeJobs: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    job: state.job
});

export default connect(mapStateToProps, { getMadeJobs, deleteJob })(RecJobListing);
