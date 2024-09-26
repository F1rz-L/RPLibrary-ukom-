import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/pattern.css';
import { useForm } from 'react-hook-form';
import { link } from '../Axios/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function submitForm(data) {
        setErrorMessage('');
        const formData = new URLSearchParams();
        formData.append('email', data.email);

        link.post(`/forgotpassword`, formData)
            .then(res => {
                setSuccessMessage('A password reset link has been sent to your email.');
                setErrorMessage('');
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
                    <h1 className='text-5xl font-bold mb-4'>Forgot Password</h1>
                    <form onSubmit={handleSubmit(submitForm)} className="flex justify-center gap-1 flex-col mt-4">
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input
                                type="text"
                                {...register("email", { required: true })}
                                className="grow placeholder-neutral"
                                placeholder="Email"
                            />
                        </label>
                        <span className="label-text text-red-700">{errors.email && "Email field is required"}</span>
                        <button type="submit" className="btn btn-primary">Send Reset Link</button>
                    </form>
                    <p className='text-sm text-center'>Suddenly remember your password? <Link to={"/login"} className="link">Login</Link>.</p>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
