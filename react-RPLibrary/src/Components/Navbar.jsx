import React from 'react'
import ThemeControl from './ThemeControl'
import { Link } from 'react-router-dom'

function Navbar() {
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
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex-1">
                    <a className="btn btn-circle btn-ghost">
                        <ThemeControl />
                    </a>
                </div>
                <div className="dropdown dropdown-end mx-2">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                        <div className="w-10 bg-neutral text-neutral-content rounded-full">
                            <span className='text-lg'>N</span>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 gap-1 z-[1] p-2 shadow bg-base-100 rounded-box">
                        <div className='container bg-base-200 rounded-box p-6 flex gap-2 justify-start'>
                            <div className="btn btn-circle avatar placeholder">
                                <div className="w-20 bg-neutral text-neutral-content rounded-full z-10">
                                    <span className='text-lg'>N</span>
                                </div>

                                {/* Bluemark, jika statuspelanggan = 2 */}
                                <div className="w-10 h-10 -mt-4 -z-0"><img src="bookmark-3-svgrepo-com.svg" alt="" /></div>
                            </div>
                            <div className="justify-start">
                                <div className="flex">
                                    <h3 className='text-lg font-bold'>Name </h3>
                                </div>
                                <p className='text-sm'>Curator</p>
                                <p className='text-sm'>email@email.com</p>
                            </div>
                        </div>
                        <li><Link to={"/transactions"}>Transactions</Link></li>
                        <li><Link to={"/login"}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar