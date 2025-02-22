import {useState} from 'react'
import { login as storeLogin } from '../store/autsSlice'
import authService from '../appwrite/auth_services'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Input, Button, Logo } from './index'

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {register, handleSubmit} = useForm()

    const signUp = async(data) => {
        setError("");
        try {
            const userData = await authService.createAccount({...data});
            if(userData.success) {
                const userData = await authService.getcurrentUser();
                if(userData) {
                    dispatch(storeLogin(userData))
                    navigate("/")
                }
            }   else {
                setError(userData.message);
            }
        } catch (error) {
            console.log("error message on signUp ", error.message);
            setError(error.message);
        }
    }
  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-2/3 md:w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60 mb-10">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-700 underline transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(signUp)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email Address: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default SignUp