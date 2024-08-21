import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/pattern.css'
import { useForm } from 'react-hook-form';
import { link } from '../Axios/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIdCard, faKey, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    function submitForm(data) {
        const formData = new URLSearchParams();x
        formData.append('email', data.email);
        formData.append('nama', data.nama);
        formData.append('alamat', data.alamat);
        formData.append('password', data.password);

        link.post(`/register`, formData).then(res => {
            sessionStorage.setItem('email', data.email)
            console.log(res.data)
            navigate('/verification')
        })
    }

    return (
        <>
            <div className="grad"></div>
            <div id='bg-pattern' className='w-svw h-svh flex justify-center align-middle'>
                <div className='flex justify-center items-center flex-col w-2/6 h-4/5 shadow-xl m-auto bg-base-200 z-10 rounded-2xl'>
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
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="text" name='email' {...register("email", { required: true })} className="grow placeholder-neutral" placeholder="Email" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faKey} />
                            <input type="password" name='password' {...register("password", { required: true })} className="grow placeholder-neutral" placeholder="Password" />
                        </label>
                        <input type="submit" value="Register" className="btn btn-primary mt-4" />
                    </form>
                    <p className='text-sm text-center'>Already have an account? <Link to={"/login"} className='link'>Login</Link>.</p>
                </div>
            </div>
        </>
    )
}

export default Register