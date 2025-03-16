import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Properties from '../Pages/property'
import Favorites from '../Pages/Favourite'
import ProtectedRoutes from './ProtectedRoutes'
import PropertyDetail from '../Pages/ViewoneProperty'



const Routing = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/properties' element={<Properties/>} />
        <Route path='/favorites' element={<ProtectedRoutes component={Favorites}/>} />
        <Route path='/property/:postId' element={<ProtectedRoutes component={PropertyDetail}/>} />
        
    </Routes>
    </>
  )
}

export default Routing