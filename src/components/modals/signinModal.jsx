import {
  FormControl,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createApiFunction } from "../../api/ApiFunction";
import { signupApi } from "../../api/Apis";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// ✅ Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/\d/, "At least one number")
    .matches(/[@$!%*?&#]/, "At least one special character"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function SigninModal({ open, onClose, onregister }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await createApiFunction("post", signupApi, null, data);
      if (response) {
        console.log(response);
        onregister();
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h5" mb={2}>
          Sign In
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <FormControl sx={{ mb: 2 }}>
            <Input
              variant="outline"
              {...register("name")}
              placeholder="Enter Name..."
              size="sm"
              color="primary"
            />
            {errors.name && (
              <Typography color="danger" level="body2">
                {errors.name.message}
              </Typography>
            )}
          </FormControl>

          {/* Email */}
          <FormControl sx={{ mb: 2 }}>
            <Input
              variant="outline"
              {...register("email")}
              placeholder="Enter Email"
              size="sm"
              color="primary"
            />
            {errors.email && (
              <Typography color="danger" level="body2">
                {errors.email.message}
              </Typography>
            )}
          </FormControl>

          {/* Password */}
          <FormControl sx={{ mb: 2, position: "relative" }}>
            <Input
              variant="outline"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              size="sm"
              color="primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
            {errors.password && (
              <Typography color="danger" level="body2">
                {errors.password.message}
              </Typography>
            )}
          </FormControl>

          {/* Confirm Password */}
          <FormControl sx={{ mb: 2 }}>
            <Input
              variant="outline"
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              size="sm"
              color="primary"
            />
            {errors.confirmPassword && (
              <Typography color="danger" level="body2">
                {errors.confirmPassword.message}
              </Typography>
            )}
          </FormControl>

          {/* Submit */}
          <FormControl>
            <Input
              variant="solid"
              size="sm"
              color="primary"
              type="submit"
              value="Register"
            />
          </FormControl>
        </form>
      </ModalDialog>
    </Modal>
  );
}
