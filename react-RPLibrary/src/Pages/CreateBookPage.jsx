import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { link } from '../Axios/link';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

function CreateBookPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const [inputSubmitted, setInputSubmitted] = useState(false);
    const [query, setQuery] = useState('');

    function handleChange(event) {
        setQuery(event.target.value);
    }

    async function GBook(event) {
        event.preventDefault();
        try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                }
            });
            return(response.data.items[0]);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }


    function createBook(data) {
        const formData = new URLSearchParams();
        formData.append('judul', data.judul);
        formData.append('pengarang', data.pengarang);
        formData.append('deskripsi', data.deskripsi);
        formData.append('penerbit', data.penerbit);
        formData.append('isbn13', data.isbn13);
        formData.append('bahasa', data.bahasa);
        formData.append('harga', data.harga);
        formData.append('page_number', data.page_number);
        formData.append('rating', data.rating);
        formData.append('tahun_terbit', data.tahun_terbit);
        formData.append('cover', '');

        link.post(`/buku`, formData).then(res => {
            console.log(res.data)
            navigate('/book-index')
        })
    }

    return (
        <>
            <div className="flex">
                <h1 className='text-5xl ml-8 mb-4 row justify-start font-extrabold'>Input Buku Baru</h1>
            </div>
            <form onSubmit={handleSubmit(createBook)}>
                <div className="rounded-box bg-base-200 m-4 p-8 flex flex-col gap-2">
                    <label htmlFor="" className="form-control">
                        <span className="label-text">ISBN 13</span>
                        <div className='flex gap-1'>
                            <input type="text" id='isbn13' {...register("isbn13", { required: true })} className="input input-bordered w-40" />
                            <span><button className='btn btn-secondary' ><FontAwesomeIcon icon={faGlobe} />Import from Books API</button></span>
                        </div>
                        <span className="label-text text-red-700">{errors.isbn13 && "ISBN 13 harus diisi"}</span>
                    </label>
                    <label htmlFor="" className="form-control">
                        <span className="label-text">Judul Buku</span>
                        <input type="text" id='judul' {...register("judul", { required: true })} className='input input-bordered' />
                        <span className="label-text text-red-700">{errors.judul && "Judul buku harus diisi"}</span>
                    </label>
                    <label htmlFor="" className="form-control">
                        <span className="label-text">Pengarang Buku</span>
                        <input type="text" id='pengarang' {...register("pengarang", { required: true })} className="input input-bordered" />
                        <span className="label-text text-red-700">{errors.pengarang && "Pengarang harus diisi"}</span>
                    </label>
                    <label className="form-control">
                        <span className="label-text">Deskripsi Buku</span>
                        <textarea name="" id="deskripsi" {...register("deskripsi", { required: true })} rows="2" className="grow textarea textarea-bordered "></textarea>
                        <span className="label-text text-red-700">{errors.deskripsi && "Deskripsi harus diisi"}</span>
                    </label>
                    <label htmlFor="" className="form-control">
                        <span className="label-text">Penerbit Buku</span>
                        <input type="text" id='penerbit' {...register("penerbit", { required: true })} className="input input-bordered" />
                        <span className="label-text text-red-700">{errors.penerbit && "Penerbit harus diisi"}</span>
                    </label>
                    <label htmlFor="" className="form-control">
                        <span className="label-text">Bahasa</span>
                        <input type="text" id='bahasa' {...register("bahasa", { required: true })} className="input input-bordered w-20 uppercase" />
                        <span className="label-text text-red-700">{errors.bahasa && "Bahasa harus diisi"}</span>
                    </label>
                    <label htmlFor="" className="form-control">
                        <span className="label-text">Tahun Terbit</span>
                        <input type="text" id='tahun_terbit' {...register("tahun_terbit", { required: true })} className="input input-bordered w-20" />
                        <span className="label-text text-red-700">{errors.tahun_terbit && "Tahun terbit harus diisi"}</span>
                    </label>
                    <label htmlFor="" className="form-control">
                        <span className="label-text">Rating</span>
                        <input type="text" id='rating' {...register("rating", { required: true })} className="input input-bordered w-10" />
                        <span className="label-text text-red-700">{errors.rating && "Rating harus diisi"}</span>
                    </label>
                    <label htmlFor="" className="form-control">
                        <span className="label-text">Page Number</span>
                        <input type="text" id='page_number' {...register("page_number", { required: true })} className="input input-bordered w-20" />
                        <span className="label-text text-red-700">{errors.page_number && "Page number harus diisi"}</span>
                    </label>
                    <label htmlFor="" className="form-control">
                        <span className="label-text">Harga</span>
                        <div>
                            <span className='text-xl font-bold'>Rp </span><input type="text" id='harga' {...register("harga", { required: true })} className="input input-bordered w-28" />
                        </div>
                        <span className="label-text text-red-700">{errors.harga && "Harga harus diisi"}</span>
                    </label>

                    <div className='flex gap-2 w-full justify-end'>
                        <input type="file" id="selectedFile" className='hidden' {...register("cover")} />
                        <input type="button" value={"Add Cover"} className="btn text-white btn-warning" onClick={() => document.getElementById('selectedFile').click()} />
                        <input type='submit' value={"Input Book"} className="btn btn-success text-white" />
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateBookPage