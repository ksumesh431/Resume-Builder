import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ component: Comp, ...remainingProps }) {
    const auth = useSelector(state => state.firebase.auth);
    return (
        <Route
            {...remainingProps}
            render={(props) =>
                isLoaded(auth) && !isEmpty(auth) ?
                    (<Comp {...props} />)
                    : (<Redirect to='/' />)
            }
        />
    )
}

export default PrivateRoute
