import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/aprofile';

const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
    });

    const [toDateDisabled, toggleDisable] = useState(false);

    const {
        school,
        fieldofstudy,
        from,
        to,
        current,
    } = formData;
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        addEducation(formData, history);
    };
    return (
        <Fragment>
            <h1>
                Add Your Education
      </h1>
            <p>
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from"
                        value={from}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                            setFormData({ ...formData, current: !current });
                            toggleDisable(!toDateDisabled);
                        }} /> Current School or Bootcamp
          </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Add Education" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>

        </Fragment >
    )
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));