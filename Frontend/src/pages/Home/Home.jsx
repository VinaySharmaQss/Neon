import React from 'react'
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import GoodMorning from '../../components/MorningText/GoodMorning';
import Slider from '../../components/Slider/Slider';
import Cards1 from '../../components/Cards/Cards1/Cards1';
const Home = () => {
  return (
    <>
    <header>
     <Navbar/>
     <GoodMorning/>
    </header>
    
    <main>
      <Slider>
        <Cards1/>
      </Slider>
    </main>
    </>
  )
}

export default Home