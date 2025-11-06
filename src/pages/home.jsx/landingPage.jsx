
import { Link, useNavigate } from "react-router-dom";

import { apiFunction } from "../../api/ApiFunction";
import { signOutApi } from "../../api/Apis";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async() => {
      // TODO: Implement your logout API or logic here
      // e.g., clear tokens from localStorage, Redux, etc.
      const response = await apiFunction("get", signOutApi, null, null);
      if(response){
        console.log(response)  
        localStorage.removeItem("user")
        localStorage.removeItem("token");
        navigate("/")
      }
    };

  return (
    <div className="flex flex-col items-center justify-center w-screen
     h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">Welcome to TrafficShield</h1>

      {user ? (
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/Dashboard/allStats")}
            className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-all cursor-pointer"
          >
            Go to Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-all cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/signin">
            <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition-all cursor-pointer">
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-white text-black border border-gray-400 py-2 px-6 rounded hover:bg-gray-100 transition-all cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
