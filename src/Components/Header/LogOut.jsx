import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../store/autsSlice'
import authService from '../../appwrite/auth_services'
import Button from '../Button';

function LogOut({className=""}) {
    const dispatch = useDispatch();
    const handleLogout = () => {
      console.log("Called Handle Logout section");
        authService.logout()
            .then(() => dispatch(logout()))
    }
  return (
    <Button children="LogOut" className=' px-6 py-2 duration-200 hover:bg-white rounded-full' bgColor='bg-gray-500' textColor='text-black' onClick={handleLogout} />
  )
}

export default LogOut