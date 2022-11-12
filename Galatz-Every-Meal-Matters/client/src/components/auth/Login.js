import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'

const Login = ({ loginUser, isAuthenticated }) => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { email, password } = user;
    let history = useHistory()

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/")
        }
        // eslint-disable-next-line
    }, [isAuthenticated])

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        loginUser({ email, password })
    }

    return (
        <div className="form-container">
            <h1>
                <span className="red-text logo">Account Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group ff">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" required name="email" value={email} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required value={password} onChange={onChange}></input>
                </div>

                <input type="submit" value="Login" className="btn waves-effect waves-light red btn-block ff" />
            </form>
        </div>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
})


export default connect(mapStateToProps, { loginUser })(Login)
