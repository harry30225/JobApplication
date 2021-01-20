import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getJobs } from '../../actions/job';
import Spinner from '../layout/Spinner';
import SearchFeature from '../layout/SearchFeature';
import SortFeature from '../layout/SortFeature';
import FilterFeature from '../layout/FilterFeature';

const JobListing = ({ getJobs, job: { loading, jobs }, aprofile: { aprofile } }) => {
    useEffect(() => {
        getJobs();
    }, []);

    return (
        <Fragment>
            {loading ? (
                <Fragment>
                    <Spinner />
                </Fragment>
            ) : (
                    <Fragment>
                        <Link onClick={getJobs} to='/job-listing' className="btn btn-primary m-2"><i className="fa fa-tag"></i> Job Listing</Link>
                        <h1>Job Listing</h1>
                        <SearchFeature />
                        <SortFeature />
                        <FilterFeature />
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
                                        {/* {parseInt(job.maxap.application) <= job.applications.length || parseInt(job.maxap.position) <= job.selected.length ? (
                                            <Fragment>
                                                <Link className="btn btn-danger">Full</Link>
                                            </Fragment>
                                        ) : (
                                                <Fragment>
                                                    {aprofile.applications.findIndex(app => app.job.toString() === job._id) === -1 ? (
                                                        <Fragment>
                                                            <Link to="!#" className="btn btn-primary"> Apply</Link>
                                                        </Fragment>
                                                    ) : (
                                                            <Fragment>
                                                                <Link className="btn btn-warning">Applied</Link>
                                                            </Fragment>
                                                        )}
                                                </Fragment>
                                            )} */}
                                    </div>
                                ))}
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <h2>No Jobs Available</h2>
                                </Fragment>
                            )}
                    </Fragment>
                )
            }
        </Fragment>

    )
};

JobListing.propTypes = {
    getJobs: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    aprofile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    job: state.job,
    aprofile: state.aprofile
});

export default connect(mapStateToProps, { getJobs })(JobListing);
