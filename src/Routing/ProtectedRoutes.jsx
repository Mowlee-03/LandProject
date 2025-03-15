import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Store/Provider/Userprovider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openAuthmodal } from '../Store/slices/authSlice';

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const dispatch = useDispatch();
    const [isUserChecked, setIsUserChecked] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setIsUserChecked(true);
        } else {
            if (!user) {
                dispatch(openAuthmodal(true));
                navigate('/');
            }
        }
    }, [user, dispatch, navigate]);

    if (!isUserChecked) {
        return null; // Avoid rendering until user check is done
    }

    if (!user) {
        return null;  // Don't render the component if user isn't logged in
    }

    return <Component {...rest} />;
}

export default ProtectedRoutes;
