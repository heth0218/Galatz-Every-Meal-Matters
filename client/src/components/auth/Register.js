import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js';

const Register = ({ isAuthenticated, registerUser }, props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    let history = useHistory()

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/")
        }
        // eslint-disable-next-line
    }, [isAuthenticated])

    const { name, email, password, password2 } = user

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        console.log(name)
        e.preventDefault();
        registerUser({ name, email, password });
        M.toast({ html: `Dear ${name}, you have successfully been registered ` })
    }

    return (
        <div className="form-container">
            <h2>
                <span className="red-text">Account Register</span>
            </h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" name="email" value={email} onChange={onChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input required minLength='6' type="text" name="password" value={password} onChange={onChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input required minLength='6' type="text" name="password2" value={password2} onChange={onChange}></input>
                </div>
                <input type="submit" value="Register" className="btn waves-effect waves-light red btn-block" />
            </form>

        </div >
    )
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, { registerUser })(Register)
