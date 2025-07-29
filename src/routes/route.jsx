import React from "react";
import {
  Outlet,
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import SigninModal from "../components/modals/signinModal";

const Layout = () => {
  return <Outlet />;
};

export default function Routess() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          
        </Route>
      </Routes>
    </Router>
  );
}
