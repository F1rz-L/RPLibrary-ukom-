import React from 'react'
import Skeleton from '../Components/Skeleton'

function BookIndex() {
    return (
        <>
            <div className='h-full w-full'>
                <div className="row ml-8 flex">
                    <form className='flex gap-2'>
                        <label className="input input-bordered flex gap-2 items-center w-full max-w-xs">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                        <select defaultValue={"A - Z"} className="select select-bordered w-full col-2 max-w-xs self-start">
                            <option value={"A - Z"}>A - Z</option>
                            <option value={"Z - A"}>Z - A</option>
                        </select>
                    </form>
                </div>
                <div className="row mx-4">
                    <Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton />
                    <Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton />
                    <Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton />
                </div>
                <div className="flex w-full justify-center row">
                    <div className="">
                        <div className="join">
                            <button className="join-item btn">1</button>
                            <button className="join-item btn btn-active">2</button>
                            <button className="join-item btn">3</button>
                            <button className="join-item btn">4</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookIndex