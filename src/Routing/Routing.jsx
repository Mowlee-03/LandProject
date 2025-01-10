import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Properties from '../Pages/property'
import Favorites from '../Pages/Favourite'



const Routing = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/properties' element={<Properties/>} />
        <Route path='/favourites' element={<Favorites/>} />

    </Routes>
    </>
  )
}

export default Routing