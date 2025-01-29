import React from 'react'
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import GoodMorning from '../../components/MorningText/GoodMorning';
import Slider from '../../components/Slider/Slider';
const Home = () => {
  return (
    <>
    <header>
     <Navbar/>
     <GoodMorning/>
    </header>
    
    <main>
      <Slider/>
    </main>
    </>
  )
}

export default Home