import { FormControl, Input, Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import React, { useState } from "react";
import SigninModal from "./signinModal";
import { useForm } from "react-hook-form";
import { createApiFunction } from "../../api/ApiFunction";
import { logInApi } from "../../api/Apis";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ open, onClose }) {
  const [registerModalOpen, setRegisterOpenModal] = useState(false);

  const navigate= useNavigate();

  const {register, handleSubmit } = useForm({
    defaultValues:{
        email: null,
        password: null
    }
  }) 

  const onSubmit = async(data) =>{
    console.log(data);
    const response = await createApiFunction("post", logInApi, null, data);
    if(response){
      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard")
    }
  }


  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <ModalDialog>
          <ModalClose  />
          <Typography>Login</Typography>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            

          <FormControl >
            <Input variant="outline" {...register("email")}  placeholder="Enter Email" size="sm" color="primary" />
            <Input variant="outline" {...register("password")}  placeholder="Enter Password" size="sm" color="primary" />
            
            <Input variant="solid" placeholder="Enter Email" size="sm" color="primary" type="submit" />
          </FormControl>
          </form>
          <button onClick={() => setRegisterOpenModal(!registerModalOpen)}>
            Register now
          </button>
        </ModalDialog>
      </Modal>
      {registerModalOpen && <SigninModal open={registerModalOpen} onClose={()=>{
        setRegisterOpenModal(false);
        onClose()
        }} onregister={()=> setRegisterOpenModal(false)}/>}
    </div>
  );
}
