import React, { useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { rateAprofile } from '../../actions/aprofile';

const RateApplicant = ({ rateAprofile, AprofileId }) => {
    const [Ratedata, SetRateData] = useState({
        rate: ""
    });

    const { rate } = Ratedata;

    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const onChange = e => SetRateData({
        ...Ratedata,
        [e.target.name]: e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        //console.log(Sortdata);
        rateAprofile(rate, AprofileId);
    };

    return (
        <Fragment>
            <button onClick={showModal} className="btn btn-info m-1 login">Rate Applicant <i className="fa fa-user"></i></button>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                    <Modal.Title>Rate Applicant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group d-flex">
                            <select placeholder="Rate.... " name="rate" value={rate} onChange={e => onChange(e)} >
                                <option value=""> None </option>
                                <option value="0"> 0 </option>
                                <option value="1"> 1 </option>
                                <option value="2"> 2 </option>
                                <option value="3"> 3 </option>
                                <option value="4"> 4 </option>
                                <option value="5"> 5 </option>
                            </select>
                            <button type="submit" className="btn btn-info m-1" onClick={hideModal} ><i className="fa fa-user"></i></button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={hideModal} className="btn btn-danger"> Cancel <i className="fa fa-minus-square"></i></button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
};

RateApplicant.propTypes = {
    rateAprofile: PropTypes.func.isRequired,
    AprofileId: PropTypes.string.isRequired,
};

export default connect(null, { rateAprofile })(RateApplicant);
