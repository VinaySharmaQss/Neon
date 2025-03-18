import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import CreateEvent from "../Admin/Place";
import CreateCuisines from "../Admin/Cusines";
import CreateNotification from "../Admin/Notification";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin/create-event"
                className={({ isActive }) =>
                  `block p-3 rounded transition ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                📅 Create Event
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/create-cusine"
                className={({ isActive }) =>
                  `block p-3 rounded transition ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                🍽️ Create Cuisine
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/create-notification"
                className={({ isActive }) =>
                  `block p-3 rounded transition ${
                    isActive ? "bg-blue-600" : "hover:bg-gray-700"
                  }`
                }
              >
                🔔 Create Notification
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Routes>
            <Route path="/admin/create-event" element={<CreateEvent />} />
            <Route path="/admin/create-cusine" element={<CreateCuisines />} />
            <Route path="/admin/create-notification" element={<CreateNotification />} />
            <Route path="/admin" element={<h2 className="text-xl font-bold">Welcome to Admin Panel</h2>} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
