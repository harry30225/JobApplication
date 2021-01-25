import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getAcceptedProfileByRec } from '../../actions/aprofile';
import Spinner from '../layout/Spinner';
import RateApplicant from './RateApplicant';
import SortSelected from './SortSelected';


const SelectedApplicants = ({ getAcceptedProfileByRec, aprofile }) => {
    useEffect(() => {
        getAcceptedProfileByRec();
    }, []);
    return (
        <Fragment>
            {aprofile.loading ? <Spinner /> : (
                <Fragment>
                    {aprofile.aprofiles.length > 0 ? (
                        <Fragment>
                            <h1>Selected Applicants</h1>
                            <SortSelected />
                            {aprofile.aprofiles.map(aprofile => (
                                <Fragment>
                                    <div className="container bg-light m-1 border border-success">
                                        {aprofile.applications.map(app => app.accepted === true && <Fragment>
                                            <h3>{aprofile.user.name}</h3>
                                            <p className="m-0"> Title : {app.job.title}</p>
                                            <p className="m-0">Type Of Job : {app.job.typeofjob}</p>
                                            <p className="m-0">Date Of Joining : <Moment format="YYYY/MM/DD">{app.dateofjoining}</Moment></p>
                                            <RateApplicant AprofileId={aprofile._id} />
                                        </Fragment>)}
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
            )
            }
        </Fragment >
    )
};

SelectedApplicants.propTypes = {
    getAcceptedProfileByRec: PropTypes.func.isRequired,
    aprofile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    aprofile: state.aprofile
});

export default connect(mapStateToProps, { getAcceptedProfileByRec })(SelectedApplicants);
