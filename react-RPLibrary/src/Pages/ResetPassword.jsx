import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/pattern.css';
import { useForm } from 'react-hook-form';
import { link } from '../Axios/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function ResetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Extract token and email from query params
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    function submitForm(data) {
        console.log(data, token, email);
        

        setErrorMessage('');
        const formData = new URLSearchParams();
        formData.append('token', token);
        formData.append('email', email);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);

        link.post(`/reset-password`, formData)
            .then(res => {
                setSuccessMessage('Password has been reset successfully.');
                setErrorMessage('');
                navigate('/login');
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
            });
    }

    return (
        <>
            <div className="grad"></div>
            <div id='bg-pattern' className='w-svw h-svh flex justify-center align-middle'>
                <div className='absolute z-[3]'>
                    {errorMessage && (
                        <div role="alert" className="alert alert-error mt-10">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            <span className="ml-2">{errorMessage}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div role="alert" className="alert alert-success mt-10">
                            <span className="ml-2">{successMessage}</span>
                        </div>
                    )}
                </div>
                <div className='flex justify-center items-center flex-col px-10 py-8 shadow-xl m-auto bg-base-200 z-[2] rounded-2xl'>
                    <h1 className='text-5xl font-bold mb-4'>Reset Password</h1>
                    <form onSubmit={handleSubmit(submitForm)} className="flex justify-center gap-1 flex-col mt-4">
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faKey} />
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                className="grow placeholder-neutral"
                                placeholder="New Password"
                            />
                        </label>
                        <span className="label-text text-red-700">{errors.password && "New password is required"}</span>
                        
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faKey} />
                            <input
                                type="password"
                                {...register("password_confirmation", { required: true })}
                                className="grow placeholder-neutral"
                                placeholder="Confirm New Password"
                            />
                        </label>
                        <span className="label-text text-red-700">{errors.password_confirmation && "Please confirm your password"}</span>
                        
                        <button type="submit" className="btn btn-primary mt-4">Reset Password</button>
                    </form>
                    <p className='text-sm text-center'>Remember your password? <Link to={"/login"} className="link">Login</Link>.</p>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
