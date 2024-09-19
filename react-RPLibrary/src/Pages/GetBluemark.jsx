import { faCheck, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { link } from '../Axios/link'
import UseGet from '../Axios/UseGet'

function GetBluemark() {
    const [idUser, setIdUser] = useState(sessionStorage.getItem('iduser'))
    const [user] = UseGet(`/user/${idUser}`)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    function subscribe() {
        setErrorMessage('')
        if (user?.data?.saldo < 120000) {
            setErrorMessage('Insufficient balance')
        } else {
            link.post('/subscribe', user?.data?.iduser).then((res) => {
                console.log(res.data)
                sessionStorage.setItem('status_user', 2)
                navigate('/')
                window.location.reload()
            }).catch((error) => {
                console.error('Error:', error);
            })
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <div className=''>
                    <div className='flex justify-center'>
                        <div className='fixed flex justify-center z-[3]'>
                            {errorMessage && (
                                <div role="alert" className="alert alert-error px-5">
                                    <FontAwesomeIcon icon={faTriangleExclamation} />
                                    <span className="ml-2">{errorMessage}</span>
                                </div>
                            )}
                        </div>
                        <img src="RPLibrary(icon).png" className='w-20 h-20 justify-self-center' alt="" />
                    </div>
                    <h1 className='text-3xl mb-4 font-bold'>Subscribing to Bluemark?</h1>
                </div>
            </div>
            <div className="flex justify-center">
                <div className='bg-base-200 p-4 rounded-box'>
                    <table className="table table-auto text-center w-20">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Regular</th>
                                <th>Bluemark</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="">
                                <th>Buy books</th>
                                <td><FontAwesomeIcon icon={faCheck} /></td>
                                <td className='text-[#03A9F4]'><FontAwesomeIcon icon={faCheck} /></td>
                            </tr>
                            <tr>
                                <th>Borrow books</th>
                                <td><FontAwesomeIcon icon={faXmark} /></td>
                                <td className='text-[#03A9F4]'><FontAwesomeIcon icon={faCheck} /></td>
                            </tr>
                            <tr>
                                <th>Read books</th>
                                <td><FontAwesomeIcon icon={faXmark} /></td>
                                <td className='text-[#03A9F4]'><FontAwesomeIcon icon={faCheck} /></td>
                            </tr>
                            <tr>
                                <th>Cool badge</th>
                                <td><FontAwesomeIcon icon={faXmark} /></td>
                                <td className='text-[#03A9F4]'><FontAwesomeIcon icon={faCheck} /></td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><button className="btn btn-disabled">Rp0.00</button></td>
                                <td>
                                    <button onClick={subscribe} className='btn btn-secondary'>{Number(120000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default GetBluemark