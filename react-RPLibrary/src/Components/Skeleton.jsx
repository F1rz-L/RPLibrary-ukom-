import React from 'react'

function Skeleton() {
    return (
        <>
            <div className='w-36 h-64 bg-base-100 mx-2 my-2 '>
                <div className="row w-36 h-48 skeleton rounded-t-box"/>
                <div className="row mt-2 flex flex-col justify-center ml-3">
                    <div className="skeleton h-4 w-4/6 my-1"/>
                    <div className="skeleton h-4 w-2/6 my-1"/>
                </div>
            </div>
        </>
    )
}

export default Skeleton