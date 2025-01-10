import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedProperties from '../components/Feature_Products'
import StatsSection from '../components/States_section'


const Home = () => {
  return (
    <>
        <main>
          <HeroSection/>
          <FeaturedProperties/>
          <StatsSection/>
        </main>
    </>
  )
}

export default Home