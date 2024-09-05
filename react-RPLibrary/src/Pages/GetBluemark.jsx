import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { link } from '../Axios/link'

function GetBluemark() {
    const [idUser, setIdUser] = useState(sessionStorage.getItem('iduser'))
    const navigate = useNavigate()
    function subscribe() {
        link.post('/subscribe', { iduser: idUser }).then((res) => {
            console.log(res.data)
            sessionStorage.setItem('status_user', 2)
            navigate('/')
            window.location.reload()
        }).catch((error) => {
            console.error('Error:', error);
        })
    }

    return (
        <>
            <div className="flex justify-center">
                <div className=''>
                    <div className='flex justify-center'>
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