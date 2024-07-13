import React, { Suspense, lazy, useEffect, useState } from 'react'
import Skeleton from '../Components/Skeleton'
import { link } from '../Axios/link'
// import Book from '../Components/Book'
import UseGet from '../Axios/UseGet'
import Fuse from 'fuse.js'
import { faFeather, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function BookIndex() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        sortFn: (a, b) => a.score - b.score,
        keys: [
            "judul",
            "pengarang",
        ]
    };

    let [isi] = UseGet('/buku')
    // console.log(isi);
    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isNotAdmin, setIsNotAdmin] = useState(true)
    const LoadedBook = lazy(() => import('../Components/Book')) // Untuk menunggu buku diambil
    const [filteredList, setFilteredList] = useState([]);
    const searchValue = watch("search");

    console.log(searchValue);

    useEffect(() => {
        if (sessionStorage.getItem('status_user') != 0) {
            setIsNotAdmin(true)
        } else {
            setIsNotAdmin(false)
        }
    }, []);

    useEffect(() => {
        if (isi.data) {
            setFilteredList(isi.data);
        }
    }, [isi]);

    function filterBooks(data) {
        console.log(data);
        const fuse = new Fuse(isi?.data, fuseOptions);
        const result = fuse.search(data?.search);
        console.log(result);
        setFilteredList(result.map(({ item }) => item));
    }

    function clearSearch() {
        reset({ search: "" });
        setFilteredList(isi.data);
    }

    return (
        <>
            <div className='h-full w-full'>
                <h1 className='text-5xl ml-8 mb-4 justify-start font-extrabold'>Book Index</h1>
                <div className="row justify-center ml-4">
                    <form className='flex gap-2' onSubmit={handleSubmit(filterBooks)}>
                        <label className="input input-bordered flex gap-2 items-center w-full max-w-xs">
                            <input id='search' type="text" {...register("search")} className="grow placeholder-neutral" placeholder="Search" />
                            {/* { ? <a href="#" onClick={clearSearch} className="btn btn-ghost"></a> : <FontAwesomeIcon icon={faMagnifyingGlass} />} */}
                            {searchValue && <a type="button" className="btn btn-ghost" onClick={clearSearch}>X</a>}
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
                        filteredList?.map((data, index) => {
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