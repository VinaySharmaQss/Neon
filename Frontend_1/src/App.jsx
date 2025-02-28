import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Ensure correct import
import Loader from "./UI/Loader";
import Test from "./pages/Test/Test";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const UpcomingEvents = lazy(() =>
  import("./pages/UpcomingEvents/UpcomingEvents")
);
const Faviorates = lazy(() => import("./pages/Faviorates/Faviorates"));
const Home = lazy(() => import("./pages/Home/Home"));
const EventDetails = lazy(() => import("./pages/EventDetails/EventDetails"));
const Recommendations = lazy(() =>
  import("./pages/Recommendations/Recommendations")
);
const Settings = lazy(() => import("./pages/Settings/Settings"));
const EditProfile = lazy(() => import("./pages/EditProfile/EditProfile"));
const Feedback = lazy(() => import("./pages/Feedback/Feedback"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const Login = lazy(() => import("./pages/Auth/Login"));
const ResetPassword = lazy(() => import("./pages/Auth/Reset"));
const CreateEvent = lazy(()=> import("./pages/Admin/Place"));
const CreateCusine = lazy(()=> import("./pages/Admin/Cusines"));


const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upcoming-events" element={<UpcomingEvents />} />
              <Route path="/event-details/:id" element={<EventDetails />} />
              <Route path="/faviorates" element={<Faviorates />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/edit-profile/:id" element={<EditProfile />} />
              <Route path="/test" element={<Test />} /> 
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/reset" element={<ResetPassword />} />
              {/* Admin Route */}
              <Route path="/admin/create-event" element={<CreateEvent />} />
              <Route path="/admin/create-cusine" element={<CreateCusine />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={true} />
      </Provider>
    </div>
  );
};

export default App;
