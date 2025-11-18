import React, { Suspense, lazy } from "react";
import {
  Outlet,
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LoginProtector, RoutesProtector } from "./routesProtector";

// ✅ Lazy imports
const LandingPage = lazy(() => import("../pages/home.jsx/landingPage"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Campaign = lazy(() => import("../pages/campaignCreation"));
const CloakingIntegration = lazy(() => import("../pages/CampaignIntegration"))
const IpListings = lazy(() => import("../pages/IpListings"));
const Analytics = lazy(() => import("../pages/Analytics"));
const SignupPage = lazy(() => import("../auth/SignUpForm"));
const LoginPage = lazy(() => import("../auth/SignInForm"));
const Test = lazy(() => import("../pages/test"));
const ClickLogs = lazy(() => import("../pages/clickLogs"));
const AllCampaignsDashboard = lazy(() => import("../pages/AllCampaign"));
const AllStats = lazy(() => import("../pages/AllStats"));
const Pricing = lazy(() => import("../pages/Pricing"));
const MyProfile = lazy(()=> import('../pages/myProfileScreen') )
const Clicklog = lazy(() => import("../pages/clickLogs1"))

const Layout = () => (
  <div className="w-[100vw] h-[100vh]">
    <Outlet />
  </div>
);

// ✅ Simple loading spinner (you can replace it with skeleton or spinner component)
const Loader = () => (
  <div className="flex items-center justify-center w-screen h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-700"></div>
  </div>
);

export default function Routess() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
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
             <Route path="campaign-integration" element={<CloakingIntegration />} />
            <Route path="ipListings" element={<IpListings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="test" element={<Test />} />
            <Route path="clickLogs" element={<ClickLogs />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path='myProfile' element={<MyProfile/> }/>
            <Route path="reports" element={<Clicklog />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

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
