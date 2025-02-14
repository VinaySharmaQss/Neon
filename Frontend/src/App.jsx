import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Ensure correct import
import Loader from './UI/Loader';
import Test from './pages/Test/Test';



const UpcomingEvents = lazy(() => import('./pages/UpcomingEvents/UpcomingEvents'));
const Faviorates = lazy(() => import('./pages/Faviorates/Faviorates'));
const Home = lazy(() => import('./pages/Home/Home'));
const EventDetails = lazy(() => import('./pages/EventDetails/EventDetails'));
const Recommendations = lazy(() => import('./pages/Recommendations/Recommendations'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const EditProfile = lazy(() => import('./pages/EditProfile/EditProfile'));
const Feedback =  lazy(() => import('./pages/Feedback/Feedback'));
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
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/test" element={<Test />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;