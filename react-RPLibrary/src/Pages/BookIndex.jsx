import React, { Suspense, lazy, useEffect, useState } from 'react';
import Skeleton from '../Components/Skeleton';
import UseGet from '../Axios/UseGet';
import Fuse from 'fuse.js';
import { faFeather } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function BookIndex() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const fuseOptions = {
        shouldSort: true,
        minMatchCharLength: 1,
        keys: [
            "judul",
            "pengarang",
            "penerbit",
            "deskripsi",
            "bahasa",
            "isbn13",
        ],
    };

    let [isi] = UseGet('/buku');
    const [isNotAdmin, setIsNotAdmin] = useState(true);
    const LoadedBook = lazy(() => import('../Components/Book'));
    const [filteredList, setFilteredList] = useState([]);
    const searchValue = watch("search");
    const sortValue = watch("sort");

    useEffect(() => {
        if (sessionStorage.getItem('status_user') != 0) {
            setIsNotAdmin(true);
        } else {
            setIsNotAdmin(false);
        }
    }, []);

    useEffect(() => {
        if (isi.data) {
            setFilteredList(isi.data);
        }
    }, [isi]);

    useEffect(() => {
        if (isi.data) {
            filterBooks({ search: searchValue, sort: sortValue });
        }
    }, [searchValue, sortValue, isi]);

    function filterBooks(data) {
        const fuse = new Fuse(isi.data, fuseOptions);
        let result = data.search ? fuse.search(data.search).map(({ item }) => item) : [...isi.data];

        if (data.sort === "Newest") {
            result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (data.sort === "Oldest") {
            result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (data.sort === "A-Z") {
            result.sort((a, b) => a.judul.localeCompare(b.judul));
        } else if (data.sort === "Z-A") {
            result.sort((a, b) => b.judul.localeCompare(a.judul));
        }

        console.log(result);
        setFilteredList(result);
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
                            {searchValue && <button type="button" className="btn btn-ghost" onClick={clearSearch}>X</button>}
                        </label>
                        <select {...register("sort")} defaultValue={"Newest"} className="select select-bordered w-full col-2 max-w-xs self-start">
                            <option value={"Newest"}>Newest</option>
                            <option value={"Oldest"}>Oldest</option>
                            <option value={"A-Z"}>A - Z</option>
                            <option value={"Z-A"}>Z - A</option>
                        </select>
                        {isNotAdmin ?
                            null :
                            <Link to={"/create-book"} className='btn btn-success text-white'><FontAwesomeIcon icon={faFeather} className='w-5 h-5' />Input Book</Link>}
                    </form>
                </div>

                <div className="container row justify-center bg-base-200 rounded-box p-4 m-4">
                    {
                        filteredList?.map((data, index) => (
                            <Suspense key={data?.idbuku} fallback={<Skeleton />}>
                                <LoadedBook {...data} />
                            </Suspense>
                        ))}
                </div>
            </div>
        </>
    );
}

export default BookIndex;
