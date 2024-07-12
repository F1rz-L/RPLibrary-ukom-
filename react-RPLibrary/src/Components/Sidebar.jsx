import { faChartSimple, faCircleInfo, faHouse, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    const [status, setStatus] = useState(0)

    useEffect(() => {
        setStatus(sessionStorage.getItem("status_user"))
    }, [])

    function adminPage() {
        if (status == 0) {
            return (
                <li className='my-1'>
                    <Link to={"/admin"} className="tooltip tooltip-right" data-tip="Admin Page">
                        <FontAwesomeIcon icon={faUserTie} className='h-5 w-5' />
                    </Link>
                </li>
            )
        }
    }

    return (
        <>
            <ul className="menu bg-base-200 rounded-box shadow-lg">
                <li className='my-1'>
                    <Link to={"/"} className="tooltip tooltip-right" data-tip="Home">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> */}
                        <FontAwesomeIcon icon={faHouse} className='h-5 w-5' />
                    </Link>
                </li>
                <li className='my-1'>
                    <Link to={"/book-index"} className="tooltip tooltip-right" data-tip="Book Index">
                        <FontAwesomeIcon icon={faCircleInfo} className='h-5 w-5' />
                    </Link>
                </li>
                {adminPage()}
                {/* <li className='my-1'>
                    <Link to={"/stats"} className="tooltip tooltip-right" data-tip="Stats">
                        <FontAwesomeIcon icon={faChartSimple} />   
                    </Link>
                </li> */}
            </ul>
        </>
    )
}

export default Sidebar