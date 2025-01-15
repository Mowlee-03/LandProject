import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Store/Provider/Userprovider'
import {Routes,Route} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { openAuthmodal } from '../Store/slices/authSlice'

const ProtectedRoutes = ({ component: Component, ...rest }) => {

    const {user}=useContext(UserContext)
    const dispatch=useDispatch()

    useEffect(() => {
        if (!user) {
        alert("Please Login To Access");
            dispatch(openAuthmodal(true));
        }
    }, [user, dispatch]);

  return (
    <Routes>
        <Route {...rest} element={<Component />} />
    </Routes> 
  )
}

export default ProtectedRoutes