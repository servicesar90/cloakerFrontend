import React from "react";
import {
  Outlet,
  Routes,
  Route,
  BrowserRouter as Router,
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

const Layout = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <Outlet />
    </div>
  );
};

export default function Routess() {
  return (
    <Router>
      
      <Routes>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route
          path="/"
          element={
            <LoginProtector>
              <Layout />
            </LoginProtector>
          }
        >
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/Dashboard" element={<RoutesProtector><Dashboard /></RoutesProtector>}>
        {/* <Route path="/Dashboard" element={<Dashboard />}> */}
          <Route path="allCampaign" element={<AllCampaignsDashboard />} />
          <Route path="create-campaign" index element={<Campaign/>} />
          <Route path="ipListings" element={<IpListings />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="test" element={<Test />} />
          <Route path="clickLogs" element={<ClickLogs />} />
        </Route>
      </Routes>
    </Router>
  );
}
