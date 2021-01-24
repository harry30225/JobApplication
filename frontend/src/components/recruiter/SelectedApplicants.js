import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAcceptedProfileByRec } from '../../actions/aprofile';
import { getMadeJobs } from '../../actions/job';
import Spinner from '../layout/Spinner';

const SelectedApplicants = ({ getAcceptedProfileByRec, getMadeJobs, job, aprofile }) => {
    useEffect(() => {
        getAcceptedProfileByRec();
        getMadeJobs();
    }, []);
    return (
        <Fragment>
            {job.loading || aprofile.loading ? <Spinner /> : (<Fragment>
                {job.jobs.length > 0 ? (
                    <Fragment>
                        {aprofile.aprofiles.length > 0 ? (
                            <Fragment>
                                <h1>Selected Applicants</h1>
                                {aprofile.aprofiles.map(aprofile => (
                                    <Fragment>
                                        <div className="container bg-light m-1 border border-success">
                                            <h3>{aprofile.user.name}</h3>
                                            {job.jobs.map(job => aprofile.applications.filter(app => app.job === job._id && app.accepted === true).length > 0 && <Fragment>
                                                <p className="m-0">{job.title}</p>
                                                <p className="m-0">{job.typeofjob}</p>
                                                {aprofile.applications.map(app => app.job === job._id && app.selected && <Fragment>
                                                    <p className="m-0">{app.dateofjoining}</p>
                                                </Fragment>)}
                                            </Fragment>)}
                                            <Link className="btn btn-info m-1">Rate the Applicant</Link>
                                        </div>
                                    </Fragment>
                                ))}
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <h1>No Selected Applicants</h1>
                                </Fragment>
                            )}
                    </Fragment>
                ) : (
                        <Fragment>
                            <h1>No Jobs Made</h1>
                        </Fragment>
                    )}
            </Fragment>)}
        </Fragment>
    )
};

SelectedApplicants.propTypes = {
    getAcceptedProfileByRec: PropTypes.func.isRequired,
    getMadeJobs: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    aprofile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    job: state.job,
    aprofile: state.aprofile
});

export default connect(mapStateToProps, { getAcceptedProfileByRec, getMadeJobs })(SelectedApplicants);
