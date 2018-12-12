import React from 'react';
import PropTypes from 'prop-types'

const LoginForm = ({ login, handleLoginFieldChange, username, password }) => {
    return(
        <div>
            <h2>Login</h2>

            <form onSubmit={login}>
            <div>
                Username 
                <input
                type="text"
                name="username"
                value={username}
                onChange={handleLoginFieldChange}
                />
            </div>
            <div>
                Password 
                <input
                type="password"
                name="password"
                value={password}
                onChange={handleLoginFieldChange}
                />
            </div>
            <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLoginFieldChange: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm