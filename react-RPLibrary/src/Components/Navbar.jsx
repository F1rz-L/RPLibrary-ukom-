import React, { useEffect, useState } from 'react'
import ThemeControl from './ThemeControl'
import { Link, useNavigate } from 'react-router-dom'
import UseGet from '../Axios/UseGet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faReceipt, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    const navigate = useNavigate()
    const [role, setRole] = useState('')
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || [])
    const [iduser, setIduser] = useState(sessionStorage.getItem('iduser') || '')
    const [user] = UseGet(`user/${iduser}`);
    const [statusUser, setStatusUser] = useState(sessionStorage.getItem('status_user'))
    const [bluemark, setBluemark] = useState(false)
    // const [inisial, setInisial] = useState(user?.data?.nama?.slice(0, 1))

    useEffect(() => {
        if (statusUser == 2 || statusUser == 0) {
            setBluemark(true)
        } else {
            setBluemark(false)
        }
    })

    // console.log(user.data.nama.slice(0, 1));

    function calculateCart() {
        let jumlah = 0
        cart.forEach(item => {
            jumlah += item.jumlah
        })
        return jumlah;
    }


    function getUser() {
        if (iduser) {
            const inisial = user?.data?.nama?.slice(0, 1)
            const statusUser = user?.data?.status;

            function roleChecker() {
                if (statusUser == 0) {
                    return 'Admin'
                } else if (statusUser == 1) {
                    return 'User'
                } else if (statusUser == 2) {
                    return 'Bluemark'
                    setBluemark(true)
                } else if (statusUser == 3) {
                    return 'Curator'
                }
            }

            function balanceChecker() {
                if (Math.sign(Number(user?.data?.saldo)) == -1) {
                    return <li className='text-red-600'><Link><FontAwesomeIcon icon={faCoins} />Your Balance: {Number(user.data?.saldo).toLocaleString("id", { style: "currency", currency: "IDR" })}</Link></li>
                } else {
                    return <li><Link><FontAwesomeIcon icon={faCoins} />Your Balance: {Number(user.data?.saldo).toLocaleString("id", { style: "currency", currency: "IDR" })}</Link></li>
                }
            }

            return (
                <div className="dropdown dropdown-end mx-2">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                        <div className="w-10 bg-neutral text-neutral-content rounded-full">
                            <span className='text-lg'>{inisial}</span>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 gap-1 z-[1] p-2 shadow bg-base-100 rounded-box">
                        <div className='container bg-base-200 rounded-box p-6 flex gap-2 justify-start'>
                            <div className="btn btn-circle avatar placeholder">
                                <div className="w-20 bg-neutral text-neutral-content rounded-full z-10">
                                    <span className='text-lg'>{inisial}</span>
                                </div>
                                {/* Bluemark, jika statuspelanggan = 2 */}
                                {bluemark ? <div className="w-10 h-10 -mt-4 -z-0"><img src="bluemark.svg" alt="" /></div> : null}
                            </div>
                            <div className="justify-start">
                                <div className="flex">
                                    <h3 className='text-lg font-bold pr-20'>{user.data?.nama}</h3>
                                </div>
                                <p className='text-sm'>{roleChecker()}</p>
                                <p className='text-sm'>{user.data?.email}</p>
                                <p className='text-sm bg-base-300 mt-2 p-2 rounded-box'>{user.data?.alamat}</p>
                            </div>
                        </div>
                        {bluemark ? null : <li><a className='bg-blue-200 border-l-[#03A9F4] border-l-4'><img src="bluemark.svg" className='w-5 -mt-2'/>Get Bluemark</a></li>}
                        {balanceChecker()}
                        <li><Link to={"/transactions"}><FontAwesomeIcon icon={faReceipt} />Transactions</Link></li>
                        <li onClick={() => logout()} className=''><a><FontAwesomeIcon icon={faRightFromBracket} />Logout</a></li>
                    </ul>
                </div>
            )
        } else {
            return (
                <Link to={"/login"} className="btn btn-accent mx-4 text-white">Login</Link>
            )
        }
    }

    function logout() {
        sessionStorage.clear();
        navigate('/login')
    }

    return (
        <div className="navbar bg-base-300 px-8">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl w-1/12"
                // style={{ backgroundImage: "url(/RPLibrary.png)", backgroundSize: "72px 72px", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                >
                    <img src="/RPLibrary.png" alt="Logo" className='min-h-10 min-w-10' />
                </Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <Link to={"/cart"}>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{calculateCart()}</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex-1">
                    <a className="btn btn-circle btn-ghost">
                        <ThemeControl />
                    </a>
                </div>
                <div>
                    {getUser()}
                </div>
            </div>
        </div>
    )
}

export default Navbar