"use client"

import NeuButton from "@/components/button";
import { AuthContext } from "@/context/auth-context";
import authSvc from "@/services/auth.service";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext) as { loggedInUser: any; setLoggedInUser: Function }
    const navigate = useNavigate()

   
    const LoginDTO = Yup.object({
        email: Yup.string().email().required("Email is required !"),
        password: Yup.string().required("Password is required ! ")

    })

    const submitForm = async (data: { email: string, password: string }) => {
        try {
            let payload = {
                email: data.email,
                password: data.password
            }
            let response = await authSvc.login(payload)
            setLoggedInUser(response)
            console.log(loggedInUser)
            navigate('/' + response.role)
        } catch (exception) {
            console.log(exception)
        }
    }



    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#FF8000] p-4 font-sans overflow-hidden">

            <div className=" hidden sm:block lg:block justify-end bg-black items-end z-10 place-self-end self-end justify-self-end">
                <img
                    src="/smoosh-menu.svg"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] object-cover object-top"
                    alt="Background design"
                    style={{ transform: 'translateX(-50%)', zIndex: 0 }}
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />

            </div>

            <div className="relative z-10 w-full max-w-md text-center">



                <h1 className="text-5xl sm:text-5xl font-bold font-gothic leading-[40px] text-white  mb-12"
                    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}>
                    Login to your account
                </h1>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const isValid = await LoginDTO.isValid({ email, password });
                        if (!isValid) return;
                        submitForm({ email, password });
                    }}

                    className="space-y-8">

                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-transparent leading-[40px] border-0 font-gothic border-b-2 border-white text-white text-3xl sm:text-4xl font-bold text-left placeholder-white placeholder-opacity-70 focus:outline-none focus:border-red-600 transition-colors duration-300 py-2"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-transparent font-gothic leading-[40px] border-0 border-b-2 border-white text-white text-3xl sm:text-4xl font-bold text-left placeholder-white placeholder-opacity-70 focus:outline-none focus:border-red-600 transition-colors duration-300 py-2"
                    />

                    <NeuButton color="#FF8000" shadow="#E1251B" className="bg-[#E1251B] text-white">
                        Log In
                    </NeuButton>
                </form>
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <LoginPage />
    );
}