import {useState} from 'react'
import {login as storeLogin} from '../store/autsSlice';
import authService from '../appwrite/auth_services';
import {Input, Button, Logo} from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; 

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm()

    const login = async(data) => {
        setError("");
        try {
            const session = await authService.login({...data})
            console.log(session);
            if(session.success) {
                const userData = await authService.getcurrentUser();
                if(userData) {
                    dispatch(storeLogin(userData))
                    navigate("/")
                } 
            }   else {
                setError(session.message);
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)}  className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        label = "Email: "
                        placeholder = "Enter your email"
                        className="p-2 pl-3 "
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address" // called regex
                            }
                        })}
                    />
                    <Input
                        label="Password: "
                        placeholder = "Enter your password"
                        className="p-2 pl-3 "
                        {...register("password", {
                            required: true
                        })}
                    />
                    <Button type="submit" children={"Sign In"} className='w-full ' />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login