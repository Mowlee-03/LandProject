import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Routing from '../Routing/Routing'

const Layout = () => {
  return (
    <>
        <Navbar/>
            <Routing/>
        <Footer/>
    </>
  )
}

export default Layout