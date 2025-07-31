import React from "react";
import {
  Outlet,
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import LandingPage from "../pages/home.jsx/landingPage";
import Dashboard from "../pages/dashboard";
import Campaign from "../pages/campaign";

const Layout = () => {
  return (
    <div className="w-[100vw] h-[100vh]">

      <Outlet />
    </div>

  )
};

export default function Routess() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          
        </Route>
        <Route path="/Dashboard" element={<Dashboard />} >
            <Route index element={<Campaign />} />
          </Route>
      </Routes>
    </Router>
  );
}
