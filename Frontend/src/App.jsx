import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Ensure correct import

const UpcomingEvents = lazy(() => import('./pages/UpcomingEvents/UpcomingEvents'));
const Faviorates = lazy(() => import('./pages/Faviorates/Faviorates'));
const Home = lazy(() => import('./pages/Home/Home'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/faviorates" element={<Faviorates />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;