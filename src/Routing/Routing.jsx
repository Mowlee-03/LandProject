import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Properties from '../Pages/property'
import Favorites from '../Pages/Favourite'
import ProtectedRoutes from './ProtectedRoutes'



const Routing = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/properties' element={<Properties/>} />
        <Route path='/favorites' element={<ProtectedRoutes component={Favorites}/>} />
        {/* <Route path='/favorites' element={<Favorites/>} /> */}
    </Routes>
    </>
  )
}

export default Routing