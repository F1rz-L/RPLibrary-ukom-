import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/pattern.css'
import { useForm } from 'react-hook-form'
import { link } from '../Axios/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faIdCard, faKey } from '@fortawesome/free-solid-svg-icons'

function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    function submitForm(data) {
        const formData = new URLSearchParams();
        formData.append('email', data.email);
        formData.append('password', data.password);

        link.post(`/login`, formData).then(res => {
            sessionStorage.setItem('iduser', res.data.user.id)
            sessionStorage.setItem('auth_token', res.data.auth_token)
            console.log(sessionStorage.getItem('auth_token'), sessionStorage.getItem('iduser'))
            navigate('/')
        })
    }

    return (
        <>
            <div className="grad"></div>
            <div id='bg-pattern' className='w-svw h-svh flex justify-center align-middle'>
                <div className='flex justify-center items-center flex-col w-2/6 h-4/5 shadow-xl m-auto bg-base-200 z-10 rounded-2xl'>
                    <h1 className='text-5xl font-bold mb-4'>Login</h1>
                    <form onSubmit={handleSubmit(submitForm)} className="flex justify-center gap-1 flex-col mt-4">
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <input type="text" {...register("email", { required: true })} className="grow placeholder-neutral" placeholder="Email" />
                        </label>
                        <span className="label-text text-red-700">{errors.email && "Kolom Email harus diisi"}</span>
                        <label className="input input-bordered flex items-center gap-2">
                            <FontAwesomeIcon icon={faKey} />
                            <input type="password" {...register("password", { required: true })} className="grow placeholder-neutral" placeholder="Password" />
                        </label>
                        <span className="label-text text-red-700">{errors.password && "Kolom Password harus diisi"}</span>
                        <button type="submit" className="btn btn-primary mt-4">Login</button>
                    </form>
                    <p className='text-sm text-center'>Don't have an account? <Link to={"/register"} className="link">Register</Link>.</p>
                    <button onClick={() => {
                        console.log(sessionStorage.getItem('token'), sessionStorage.getItem('iduser'));
                    }}>test token</button>
                </div>
            </div>
        </>
    )
}

export default Login