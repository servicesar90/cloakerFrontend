import React, { useState } from "react";
import LoginModal from "../../auth/SignInForm";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <Link to="/login">
        <button className="bg-white text-black py-2 px-5 mt-10 border-rounded cursor-pointer">
          Login
        </button>
      </Link>
    </div>
  );
}
