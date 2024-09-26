import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/pattern.css'
import { useForm } from 'react-hook-form';
import { link } from '../Axios/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIdCard, faKey, faMapLocationDot, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    function submitForm(data) {
        // Calculate age
        const birthDate = new Date(data.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Check if the user is younger than 12
        if (age < 12 || (age === 12 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            setErrorMessage("You must be at least 12 years old to register.");
            return;
        }
        if (data.NIK && data.NIK.length !== 16) {
            setErrorMessage("NIK must be 16 digits long.");
            return;
        }
        if (data.nomortelp && data.nomortelp.length !== 12) {
            setErrorMessage("Phone Number must be 12 digits long.");
            return;
        }



        const formData = new URLSearchParams();
        formData.append('email', data.email);
        formData.append('nama', data.nama);
        formData.append('alamat', data.alamat);
        formData.append('password', data.password);
        formData.append('birthDate', data.birthDate);

        link.post(`/register`, formData).then(res => {
            sessionStorage.setItem('email', data.email)
            console.log(res.data)
            navigate('/verification')
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessages = error.response.data.message;

                // Get the first field's error messages
                const firstField = Object.keys(errorMessages)[0];
                const firstMessage = errorMessages[firstField][0]; // Get the first error message of that field

                setErrorMessage(firstMessage);
            } else {
                setErrorMessage('An unknown error occurred.');
            }
            console.log(error.response.data);

        })
    }

    return (
        <>
            <div className="grad"></div>
            <div id='bg-pattern' className='w-svw h-svh flex justify-center align-middle'>
                <div className='absolute z-[15]'>
                    {errorMessage && (
                        <div role="alert" className="alert alert-error mt-10">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            <span className="ml-2">
                                {errorMessage === 'Email Not Verified' ? (
                                    <>
                                        Email not verified. <Link to="/verification" className="link">Verify now?</Link>
                                    </>
                                ) : (
                                    errorMessage
                                )}
                            </span>
                        </div>
                    )}
                </div>
                <div className='flex justify-center items-center flex-col w-2/6 shadow-xl m-auto bg-base-200 z-10 rounded-2xl'>
                    <h1 className='text-5xl font-bold mb-4'>Register</h1>
                    <form onSubmit={handleSubmit(submitForm)} className="flex justify-center gap-1 flex-col mt-4">
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faIdCard} />
                            <input type="text" name='nama' {...register("nama", { required: true })} className="grow placeholder-neutral" placeholder="Nama" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faMapLocationDot} />
                            <input type="text" name='alamat' {...register("alamat", { required: true })} className="grow placeholder-neutral" placeholder="Alamat" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faMapLocationDot} />
                            <input type="text" name='alamat' {...register("NIK", { required: true })} className="grow placeholder-neutral" placeholder="NIK" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faMapLocationDot} />
                            <input type="text" name='alamat' {...register("nomortelp", { required: true })} className="grow placeholder-neutral" placeholder="Nomor Telepon" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="text" name='email' {...register("email", { required: true })} className="grow placeholder-neutral" placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faKey} />
                            <input type="password" name='password' {...register("password", { required: true })} className="grow placeholder-neutral" placeholder="Password" />
                        </label>
                        <div className="form-control w-full max-w-xs">
                            <input type="date" name='birthDate' {...register("birthDate", { required: true })} className="input input-bordered w-full max-w-xs" />
                            {errors.birthDate && <p className="text-red-500 text-sm mt-1">Birth date is required</p>}
                        </div>

                        <input type="submit" value="Register" className="btn btn-primary mt-4" />
                    </form>
                    <p className='text-sm text-center'>Already have an account? <Link to={"/login"} className='link'>Login</Link>.</p>
                </div>
            </div>
        </>
    )
}

export default Register
