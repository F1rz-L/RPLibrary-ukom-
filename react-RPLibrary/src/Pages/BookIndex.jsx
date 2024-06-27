import React, { Suspense, lazy, useEffect, useState } from 'react'
import Skeleton from '../Components/Skeleton'
import { link } from '../Axios/link'
// import Book from '../Components/Book'
import UseGet from '../Axios/UseGet'
import { faFeather } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function BookIndex() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    function filterBooks(data) {
        console.log(data);

        switch (data.sort) {
            case "A-Z":
                isi.sort()
                break;
            case "Z-A":
                isi.reverse()
                break;
            default:
                [isi] = UseGet('/buku')
                break;
        }
    }

    const [isi] = UseGet('/buku')
    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isNotAdmin, setIsNotAdmin] = useState(true)
    const LoadedBook = lazy(() => import('../Components/Book')) // Untuk menunggu buku diambil

    useEffect(() => {
        if (sessionStorage.getItem('status_user') != 0) {
            setIsNotAdmin(true)
        } else {
            setIsNotAdmin(false)
        }
    }, []);

    // useEffect(() => {
    //     const storedCart = JSON.parse(sessionStorage.getItem('cart'));
    //     if (storedCart) {
    //       setCart(storedCart);
    //     }
    // }, []);

    // useEffect(() => {
    //     sessionStorage.setItem('cart', JSON.stringify(cart));
    // }, [cart]);
    
    // function addToCart(product) {
    //     setCart([...cart, product]);
    // };

    return (
        <>
            <div className='h-full w-full'>
                <h1 className='text-5xl ml-8 mb-4 justify-start font-extrabold'>Book Index</h1>
                <div className="row justify-center ml-4">
                    <form className='flex gap-2' onSubmit={handleSubmit(filterBooks)}>
                        <label className="input input-bordered flex gap-2 items-center w-full max-w-xs">
                            <input type="text" {...register("search")} className="grow placeholder-neutral" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                        <select {...register("sort")} defaultValue={"Newest"} className="select select-bordered w-full col-2 max-w-xs self-start">
                            <option value={"Newest"}>Newest</option>
                            <option value={"Oldest"}>Oldest</option>
                            <option value={"A-Z"}>A - Z</option>
                            <option value={"Z-A"}>Z - A</option>
                        </select>
                        {/* <input type="submit" value="Filter" /> */}
                        {isNotAdmin ? null : <Link to={"/create-book"} className='btn btn-success text-white'><FontAwesomeIcon icon={faFeather} className='w-5 h-5' />Input Book</Link>}
                    </form>
                </div>

                {/* memanggil semua buku yang ada di database table 'bukus' */}
                <div className="container row justify-center bg-base-200 rounded-box p-4 m-4">
                    {
                        isi.data?.map((data, index) => {
                            return (
                                <Suspense key={index} fallback={<Skeleton />}>
                                    <LoadedBook {...data} />
                                </Suspense> // Suspense digunakan untuk menunggu buku di load
                            )
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