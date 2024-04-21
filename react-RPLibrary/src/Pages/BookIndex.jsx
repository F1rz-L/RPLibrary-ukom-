import React from 'react'
import Skeleton from '../Components/Skeleton'
import { link } from '../Axios/link'
import Book from '../Components/Book'
import UseGet from '../Axios/UseGet'

function BookIndex() {

    const [isi] = UseGet('/buku')
    console.log(isi.data)

    async function ambilData() {

    }

    return (
        <>
            <div className='h-full w-full'>
                <h1 className='text-5xl ml-8 mb-4 justify-start font-extrabold'>Book Index</h1>
                <div className="row justify-center ml-4">
                    <form className='flex gap-2'>
                        <label className="input input-bordered flex gap-2 items-center w-full max-w-xs">
                            <input type="text" className="grow placeholder-neutral" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                        <select defaultValue={"A - Z"} className="select select-bordered w-full col-2 max-w-xs self-start">
                            <option value={"A - Z"}>A - Z</option>
                            <option value={"Z - A"}>Z - A</option>
                        </select>
                    </form>
                </div>
                <div className="container row justify-center bg-base-200 rounded-box p-4 m-4">
                    {
                        isi.data?.map((data, index) => {
                            return (<Book key={index} {...data} />)
                        })
                    }
                </div>
                {/* <div className="row">
                    <div className="flex w-full justify-center">
                        <div className="join">
                            <button className="join-item btn">1</button>
                            <button className="join-item btn btn-active">2</button>
                            <button className="join-item btn">3</button>
                            <button className="join-item btn">4</button>
                        </div>
                    </div>
                </div> */}
                
            </div>
        </>
    )
}

export default BookIndex