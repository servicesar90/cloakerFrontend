// import { FormControl, Input, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
// import React, { useState } from "react";
// import SigninModal from "./signinModal";
// import { useForm } from "react-hook-form";
// import { createApiFunction } from "../../api/ApiFunction";
// import { logInApi } from "../../api/Apis";
// import { useNavigate } from "react-router-dom";

// export default function LoginModal({ open, onClose }) {
//   const [registerModalOpen, setRegisterOpenModal] = useState(false);

//   const navigate= useNavigate();

//   const {register, handleSubmit } = useForm({
//     defaultValues:{
//         email: null,
//         password: null
//     }
//   })

//   const onSubmit = async(data) =>{

//     const response = await createApiFunction("post", logInApi, null, data);
//     if(response){
//       console.log(response)
//       localStorage.setItem("user", JSON.stringify(response.data.data) )
//       localStorage.setItem("token", response.data.token);
//       navigate("/dashboard")
//     }
//   }

//   return (
//     <div>
//       <Modal open={open} onClose={onClose}>
//         <ModalDialog>
//           <ModalClose  />
//           <Typography>Login</Typography>

//           <form onSubmit={handleSubmit(onSubmit)}>

//           <FormControl >
//             <Input variant="outline" {...register("email")}  placeholder="Enter Email" size="sm" color="primary" />
//             <Input variant="outline" {...register("password")}  placeholder="Enter Password" size="sm" color="primary" />

//             <Input variant="solid"  size="sm" color="primary" type="submit" />
//           </FormControl>
//           </form>
//           <button onClick={() => setRegisterOpenModal(!registerModalOpen)}>
//             Register now
//           </button>
//         </ModalDialog>
//       </Modal>
//       {registerModalOpen && <SigninModal open={registerModalOpen} onClose={()=>{
//         setRegisterOpenModal(false);
//         onClose()
//         }} onregister={()=> setRegisterOpenModal(false)}/>}
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createApiFunction } from "../api/ApiFunction";
import { logInApi } from "../api/Apis";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = formData;
    console.log("Submitting form data:", data);

    try {
      const response = await createApiFunction("post", logInApi, null, data);
      if (response) {
        console.log("Login successful:", response);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-20 py-12">
       

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
        <p className="text-gray-500 mb-8">
          Enter your email and password to sign in!
        </p>

        {/* Google / X Buttons */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <button className="flex items-center justify-center w-1/2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm text-gray-700 font-medium">
              Sign in with Google
            </span>
          </button>

         
        </div>

        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-200" />
          <span className="px-3 text-gray-400 text-sm">Or</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={onSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="info@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>
          </div>

          {/* Keep me logged in */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mr-2 rounded text-indigo-600"
              />
              Keep me logged in
            </label>
            <Link
              to="/reset-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Sign in
          </button>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* RIGHT PANEL */}
      <div className="hidden md:flex w-1/2 bg-[#0B0E2A] text-white items-center justify-center relative overflow-hidden">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:40px_40px]" />

        <div className="relative text-center px-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-indigo-500 p-3 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
            <h2 className="ml-3 text-2xl font-semibold">CloakShield</h2>
          </div>
          <p className="text-gray-300 text-sm max-w-sm mx-auto">
            Shield your campaigns. Boost your performance.  
            Experience smart traffic cloaking — secure, optimized, and effortless.
          </p>
        </div>

        <div className="absolute bottom-6 right-6 bg-indigo-600 p-3 rounded-full">
          🌙
        </div>
      </div>
    </div>
  );
}

