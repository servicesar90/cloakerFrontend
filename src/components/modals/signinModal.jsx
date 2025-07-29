import {
  FormControl,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import React from "react";
import { useForm } from "react-hook-form";
import { createApiFunction } from "../../api/ApiFunction";
import { signupApi } from "../../api/Apis";
import { useNavigate } from "react-router-dom";

export default function SigninModal({ open, onClose, onregister }) {

  const navigate = useNavigate()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: null,
      email: null,
      password: null,
     
    },
  });

  const onSubmit = async(data) => {
    console.log(data);
    const response = await createApiFunction("post", signupApi, null, data);
    if(response){
      console.log(response);
      onregister()
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Typography>Sign in</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>

        <FormControl >
          <Input
            variant="outline"
            {...register("name")}
            placeholder="Enter Name..."
            size="sm"
            color="primary"
          />
          <Input
            variant="outline"
            {...register("email")}
            placeholder="Enter Email"
            size="sm"
            color="primary"
          />
          <Input
            variant="outline"
            {...register("password")}
            type="password"
            placeholder="Enter Password"
            size="sm"
            color="primary"
          />
          
          <Input
            variant="solid"
          
            size="sm"
            color="primary"
            type="submit"
          />
        </FormControl>
        </form>
      </ModalDialog>
    </Modal>
  );
}
