import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {

    return (
        <div>
            <Route {...rest} render={props => !isAuthenticated ? (
                <Redirect to='/login'></Redirect>
            ) : (
                    <Component {...props} />
                )}></Route>

        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, null)(PrivateRoute);