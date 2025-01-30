import React from 'react'
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import GoodMorning from '../../components/MorningText/GoodMorning';
import Slider from '../../components/Slider/Slider';
import Cards1 from '../../components/Cards/Cards1/Cards1';
import Cards2 from '../../components/Cards/Cards2/Cards2';
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

      <Slider>
        <Cards2/>
      </Slider>
    </main>
    </>
  )
}

export default Home