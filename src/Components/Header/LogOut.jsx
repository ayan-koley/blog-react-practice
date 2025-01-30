import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/autsSlice";
import authService from "../../appwrite/auth_services";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

function LogOut({ className = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await authService.logout();
    console.log("response is ", response);
    if (response) {
      dispatch(logout());
      navigate("/");
    }
  };
  return (
    <Button
      children="LogOut"
      className=" px-6 py-2 duration-200 hover:bg-white rounded-full"
      bgColor="bg-gray-500"
      textColor="text-black"
      onClick={handleLogout}
    />
  );
}

export default LogOut;
