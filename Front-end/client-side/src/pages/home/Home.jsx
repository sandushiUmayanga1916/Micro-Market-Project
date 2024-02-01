import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialBatteries from './SpecialBatteries'
import Testimonials from './Testimonials'
import OurServices from './OurServices'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <SpecialBatteries/>
      <Testimonials/>
      <OurServices/>
    </div>
  )
}

export default Home