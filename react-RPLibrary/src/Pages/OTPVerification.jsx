import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import OtpInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import { link } from '../Axios/link'

function OTPVerification() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')

    function checkOTP() {
        const formData = new URLSearchParams();
        formData.append('otp', otp);
        const email = sessionStorage.getItem("email");
        if (!email) {
            console.error("No email found in session storage");
            return;
        }
        formData.append('email', email);
    
        console.log("Form Data:", formData.toString());
    
        link.post('/otp', formData).then(res => {
            if (res.status === 200) {
                sessionStorage.clear();
                navigate("/login");
            }
        }).catch(error => {
            console.error("Error during OTP verification:", error);
        });
    }
    

    return (
        <>
            <div className="grad"></div>
            <div id='bg-pattern' className='w-svw h-svh flex justify-center align-middle'>
                <div className='flex justify-center items-center flex-col w-2/6 py-10 shadow-xl m-auto bg-base-200 z-10 rounded-2xl'>
                    <h1 className='text-5xl font-bold'>Enter OTP</h1>
                    <form className="flex justify-center gap-1 flex-col mt-10" onSubmit={handleSubmit(checkOTP)}>

                        <div className=''>
                            <OtpInput
                                shouldAutoFocus={true}
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                skipDefaultStyles={true}
                                inputStyle={"input input-bordered w-11 mx-1"}
                                // renderSeparator={<span></span>}
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>
                        <input type="submit" value="Submit" className='btn btn-primary mt-2' />
                    </form>
                    <p className='text-sm text-center opacity-80 mt-2'>Didn't receive the e-mail? <a className='link'>Resend OTP</a>.</p>
                </div>
            </div>
        </>
    )
}

export default OTPVerification