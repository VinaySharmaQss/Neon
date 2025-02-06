import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Ensure correct import
import Loader from './UI/Loader';


const UpcomingEvents = lazy(() => import('./pages/UpcomingEvents/UpcomingEvents'));
const Faviorates = lazy(() => import('./pages/Faviorates/Faviorates'));
const Home = lazy(() => import('./pages/Home/Home'));
const EventDetails = lazy(() => import('./pages/EventDetails/EventDetails'));
const Recommendations = lazy(() => import('./pages/Recommendations/Recommendations'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route index path="/" element={<Home />}/ >
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/event-details" element={<EventDetails/>} /> 
          <Route path="/faviorates" element={<Faviorates />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;