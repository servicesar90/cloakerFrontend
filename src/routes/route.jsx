import React from "react";
import {
  Outlet,
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import LandingPage from "../pages/home.jsx/landingPage";
import Dashboard from "../pages/dashboard";
import Campaign from "../pages/campaignCreation";
import IpListings from "../pages/IpListings";
import Analytics from "../pages/Analytics";
import { LoginProtector, RoutesProtector } from "./routesProtector";
import SignupPage from "../auth/SignUpForm";
import LoginPage from "../auth/SignInForm";
import Test from "../pages/test";
import ClickLogs from "../pages/clickLogs";
import AllCampaignsDashboard from "../pages/AllCampaign";
import AllStats from "../pages/AllStats";
import Pricing from '../pages/Pricing';
import { Toaster } from "react-hot-toast";

const Layout = () => (
  <div className="w-[100vw] h-[100vh]">
    <Outlet />
  </div>
);

export default function Routess() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Guest Only Routes */}
        <Route
          path="/signin"
          element={
            <LoginProtector>
              <LoginPage />
            </LoginProtector>
          }
        />
        <Route
          path="/signup"
          element={
            <LoginProtector>
              <SignupPage />
            </LoginProtector>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/Dashboard"
          element={
            <RoutesProtector>
              <Dashboard />
            </RoutesProtector>
          }
        >
          
          <Route path="allStats" element={<AllStats />} />
          <Route path="allCampaign" element={<AllCampaignsDashboard />} />
          <Route path="create-campaign" element={<Campaign />} />
          <Route path="ipListings" element={<IpListings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="test" element={<Test />} />
          <Route path="clickLogs" element={<ClickLogs />} />
          <Route path="Pricing" element={<Pricing/>} />

        </Route> 

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            zIndex: 99999,
          },
        }}
      />
    </Router>
  );
}
