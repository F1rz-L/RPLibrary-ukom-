import { faBars, faEdit, faEllipsis, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy, useEffect, useRef, useState } from 'react'
import { link } from '../Axios/link';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from 'axios';


function Book(props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    // Untuk menyesuaikan panjang judul
    function truncateString(str, num) {
        if (str.length > num) {
            let truncStr = str.toString().slice(0, num) + "...";
            return truncStr;
        } else {
            return str;
        }
    }

    // Untuk menyesuaikan ukuran judul
    function judulChecker(judul) {
        if (judul.length > 34 && judul.length < 40) {
            return (<h3 className="font-bold text-3xl">{judul}</h3>)
        } if (judul.length > 39 && judul.length < 60) {
            return (<h3 className="font-bold text-xl">{judul}</h3>)
        } if (judul.length > 59) {
            return (<h3 className="font-bold text-sm">{judul}</h3>)
        } else {
            return (<h3 className="font-bold text-4xl">{judul}</h3>)
        }
    }

    // Untuk menghapus buku
    function deleteBook(id) {
        link.delete(`/buku/${id}`).then(() => {
            console.log(`deleted ${id}`);
            window.location.reload()
        })
    }

    // console.log(props);

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalIsEditing, setModalIsEditing] = useState(false)
    const [editContent, setEditContent] = useState()
    const [shortJudul, setShortJudul] = useState(truncateString(props.judul, 9))
    const [shortPengarang, setShortPengarang] = useState(truncateString(props.pengarang, 10))
    const [isNotAdmin, setIsNotAdmin] = useState(sessionStorage.getItem('status_user') == 0 ? false : true)
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')))

    // const [idUser, setIdUser] = useState(sessionStorage.getItem('iduser'))
    const [idUser, setIdUser] = useState(props.idUser)
    const [idBukuPinjam, setIdBukuPinjam] = useState(props.idBukuPinjam)

    const [cover, setCover] = useState(props.cover)
    const [id, setId] = useState(props.idbuku)
    const [judul, setJudul] = useState(props.judul)
    const [pengarang, setPengarang] = useState(props.pengarang)
    const [deskripsi, setDeskripsi] = useState(props.deskripsi)
    const [penerbit, setPenerbit] = useState(props.penerbit)
    const [isbn13, setIsbn13] = useState(props.isbn13)
    const [tahunTerbit, setTahunTerbit] = useState(props.tahun_terbit)
    const [bahasa, setBahasa] = useState(props.bahasa)
    const [harga, setHarga] = useState(props.harga)
    const [pageNumber, setPageNumber] = useState(props.page_number)
    const [rating, setRating] = useState(props.rating)
    const [idPeminjam, setIdPeminjam] = useState(props.idpeminjam)
    const [namaFile, setNamaFile] = useState(props.namafile)


    useEffect(() => {
        setIdUser(props.idUser)
        setIdBukuPinjam(props.idbukupinjam)
        setIdPeminjam(props.idpeminjam) 
    }, [props.idbukupinjam, props.idUser, props.idpeminjam])  

    // useEffect(() => {
        // console.log("idUser2:", idUser, props.idUser);
        // console.log("idBukuPinjam:", idBukuPinjam);
        // console.log("idPeminjam:", idPeminjam);
    // }, [idUser, idBukuPinjam, idPeminjam]) 
    
    function bookInteractionChecker(id_user, book_pdf, peminjam_id, buku_dipinjam, is_not_admin) {
        console.log(id_user, book_pdf, peminjam_id, buku_dipinjam, is_not_admin);
        let a, b, c, d;
        if (id_user) {
            if (book_pdf) { 
                a = (<Link className="btn bg-transparent border-[#03A9F4] border-2 hover:bg-[#03A9F4] hover:border-[#03A9F4] hover:text-white group" to={`/read/${id}`}><img src="bluemark.svg" alt="" className='w-8 -m-1 mb-3' />Read Book </Link>)
            }

            if (peminjam_id) {
                b = (<div className="tooltip" data-tip={`Not Available. Try again later`}><button className="btn btn-disabled">Borrow Book</button></div>)
            } if (peminjam_id == id_user) {
                b = (<div className="tooltip" data-tip={`You have borrowed this book`}><button className="btn btn-disabled">Borrow Book</button></div>)
            } else if (buku_dipinjam !== null) {
                b = (<div className="tooltip" data-tip={`You have borrowed another book. Return the previous book first`}><button className="btn btn-disabled">Borrow Book</button></div>)
            } else {
                b = (<button onClick={() => { borrowBook() }} className="btn bg-transparent border-[#03A9F4] border-2 hover:bg-[#03A9F4] hover:border-[#03A9F4] hover:text-white group" ><img src="bluemark.svg" alt="" className='w-8 -m-1 mb-3' />Borrow Book</button>)
            }
    
            c = (<button className="btn btn-secondary" onClick={() => { addToCart() }}>Add to cart</button>
)
            if (!is_not_admin) {
                d = (<div className="dropdown dropdown-top">
                        <div tabIndex={0} role="button" className="btn btn-accent"><FontAwesomeIcon icon={faBars} /></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mb-2 shadow bg-base-100 rounded-box">
                            <li><a onClick={() => setModalIsEditing(true)}><FontAwesomeIcon icon={faEdit} /> Edit</a></li>
                            <li onClick={() => deleteBook(id)}><a><FontAwesomeIcon icon={faTrash} /> Delete</a></li>
                        </ul>
                    </div>)
            }
        } else {
            b = (<div className="tooltip" data-tip={`You must login first`}><button className="btn btn-disabled">Borrow Book</button></div>)
            c = (<div className="tooltip" data-tip={`You must login first`}><button className="btn btn-disabled">Add to cart</button></div>)
        }
        return [a, b, c, d];
    }

    function addToCart() {
        setCart([...cart, {
            id: id,
            jumlah: 1
        }])

        setTimeout(() => {
            window.location.reload()
        }, 200);
    }



    function borrowBook() {
        const formData = new URLSearchParams();
        formData.append('iduser', idUser);

        if (idUser) {
            link.post(`/pinjam/${id}`, formData).then((res) => {
                console.log(res.data);
                window.location.reload();
            }).catch((error) => {
                console.error('Error:', error);
            });
        } else {
            console.error('You must login first');
        }
    }

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function submitEdit(data) {
        const token = sessionStorage.getItem('auth_token');
        const formData = new FormData();
        formData.append('judul', data.judul);
        formData.append('pengarang', data.pengarang);
        formData.append('deskripsi', data.deskripsi);
        formData.append('penerbit', data.penerbit);
        formData.append('isbn13', data.isbn13);
        formData.append('bahasa', data.bahasa);
        formData.append('harga', data.harga);
        formData.append('page_number', data.pageNumber);
        formData.append('rating', data.rating);
        formData.append('tahun_terbit', data.tahunTerbit);
        if (data.namafile) {
            console.log("Appending file buku:", data.namaFile?.[0]);
        }
        formData.append('namafile', data.namaFile?.[0]);
        if (data.cover) {
            formData.append('cover', data.cover?.[0]);
        }

        // console.log(data);

        axios.post(`http://127.0.0.1:8000/api/buku/${id}?_method=PUT`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        ).then(res => {
            console.log(res.data);
            console.log(data);
            window.location.reload()
        })
    }

    function coverChecker(state) {
        if (state == "initial") {
            if (!cover) {
                return (
                    <img src={"RPLibrary(placeholder).jpg"} className='' />
                )
            } else {
                return (
                    <img src={cover} className='' />
                )
            }
        } else if (state == "modal") {
            if (!cover) {
                return (
                    <img src={"RPLibrary(placeholder).jpg"} className='max-h-[75svh]' />
                )
            } else {
                return (
                    <img src={cover} className='h-[75svh] ' />
                )
            }
        }
    }

    // Untuk memanggil fungsi edit
    useEffect(() => {
        if (modalIsEditing) {
            setEditContent(
                <>
                    <form onSubmit={handleSubmit(submitEdit)}>
                        <div className='mx-8'>
                            <input type="text" defaultValue={judul} {...register("judul", { required: true })} className='input input-bordered w-full' />
                            {errors.judul && <span>This field is required</span>}
                            <p className="text-sm">By <input type="text" defaultValue={pengarang} {...register("pengarang", { required: true })} className="input input-bordered w-48 h-10 mt-1" />
                                {errors.pengarang && <span>This field is required</span>} </p>
                        </div>
                        <div className="mx-4 justify-center p-4 rounded-box my-4 bg-base-200 h-3/6 overflow-auto">
                            <textarea name="" defaultValue={deskripsi} {...register("deskripsi", { required: true })} rows="1.8" className="textarea textarea-bordered w-full overflow-hidden"></textarea>
                            <div className="divider" />
                            <div className='flex justify-center '>
                                <input type="text" defaultValue={pageNumber} {...register("pageNumber", { required: true })} className="input input-bordered w-20 text-center" />
                                <div className="divider divider-horizontal" />
                                <input type="text" defaultValue={bahasa} {...register("bahasa", { required: true })} className="input input-bordered w-20 text-center uppercase" />
                                <div className="divider divider-horizontal" />
                                <input type="text" defaultValue={tahunTerbit} {...register("tahunTerbit", { required: true })} className="input input-bordered w-20 text-center" />
                                <div className="divider divider-horizontal" />
                                <input type="text" defaultValue={rating} {...register("rating", { required: true })} className="input input-bordered w-12 text-center" /><p className="text-xl mt-[0.6rem]">/5</p>
                            </div>
                            <div className="divider"></div>
                            <div className='flex justify-center '>
                                <p>ISBN13: <input type="text" defaultValue={isbn13} {...register("isbn13", { required: true })} className="input input-bordered w-40" /></p>
                                <div className="divider divider-horizontal" />
                                <input type="text" defaultValue={penerbit} {...register("penerbit", { required: true })} className="input input-bordered w-60" />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between px-8 h-1/6">
                            <div className='flex-col col-6'>
                                <h2 className='text-4xl'>Rp <input type="text" defaultValue={harga} {...register("harga", { required: true })} className="input input-bordered w-28 h-10" /></h2>
                            </div>
                            <div className='col-6 flex gap-2'>
                                <input type="file" id="selectedIMG" name='cover' className='hidden' {...register("cover")} />
                                <input type="button" value={"Edit Cover"} className="btn text-white btn-warning" onClick={() => document.getElementById('selectedIMG').click()} />

                                <input type="file" id="selectedPDF" name='namaFile' className='hidden' {...register("namaFile")} />
                                <input type="button" value={"Insert PDF"} className="btn text-white btn-accent" onClick={() => document.getElementById('selectedPDF').click()} />
                                {/* <input type="file" className="file-input file-input-bordered w-full" /> */}
                                <input type='submit' value={"Confirm Edit"} className="btn btn-success text-white" />
                            </div>
                        </div>
                    </form>
                </>
            )
        } else {
            setEditContent(
                <>
                    <div className='mx-8'>
                        {judulChecker(judul)}
                        <p className="text-sm">By {pengarang}</p>
                    </div>
                    <div className="mx-4 justify-center p-4 rounded-box my-4 bg-base-200 h-64 overflow-auto">
                        <p>{deskripsi}</p>
                        <div className="divider" />
                        <div className='flex justify-center '>
                            <p>{pageNumber} Page(s)</p>
                            <div className="divider divider-horizontal" />
                            <p className='uppercase'>{bahasa}</p>
                            <div className="divider divider-horizontal" />
                            <p>{tahunTerbit}</p>
                            <div className="divider divider-horizontal" />
                            <div className="row"><p className='mask mask-star-2 mr-1 mt-1 bg-orange-400 w-4 h-4'></p>{rating}/5</div>
                        </div>
                        <div className="divider"></div>
                        <div className='flex justify-center '>
                            <p>ISBN13: {isbn13}</p>
                            <div className="divider divider-horizontal" />
                            <p>{penerbit}</p>
                        </div>
                    </div>
                    <div className="flex pl-8 -mt-3 justify-between">
                        <div className='flex flex-col'>
                            <h2 className={namaFile ? "font-bold text-4xl" : "font-bold text-5xl"}>{Number(harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h2>
                        </div>
                    </div>
                    <div className="flex justify-end mt-3 w-full">
                        <div className='gap-1 flex mr-12'>
                            {bookInteractionChecker(idUser, namaFile, idPeminjam, idBukuPinjam, isNotAdmin)}
                        </div> 
                    </div>
                </>
            )
        }
    }, [modalIsEditing])

    return (
        <>
            {/* Modal/Pop-up untuk buku */}
            <dialog id={`bookInfoModal${id}`} className="modal">
                <div className="modal-box w-full max-w-5xl h-full overflow-hidden">
                    <form method="dialog">
                        <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
                            setModalIsOpen(false)
                            setModalIsEditing(false)
                        }}>✕</button>
                    </form>
                    <div className="row flex h-max">
                        <div className='rounded-lg col-4 glass flex justify-center align-middle h-1/6'>
                            {coverChecker("modal")}
                        </div>
                        <div className="col-8 flex-col">
                            {editContent}
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => {
                        setModalIsOpen(false);
                        setModalIsEditing(false);
                    }}>close</button>
                </form>
            </dialog>

            {/* Tampilan buku saat modal belum dibuka */}
            <div id={`book${id}`} onClick={() => {
                document.getElementById(`bookInfoModal${id}`).showModal();
                console.log(id, judul, namaFile, idPeminjam);
            }} className='w-36 h-64 bg-base-100 mx-2 my-2 cursor-pointer rounded-box'>
                <div className="bg-base-300 row overflow-hidden h-48 w-36 rounded-t-box">
                    {coverChecker("initial")}
                </div>
                <div className="row mt-2 flex justify-center">
                    {namaFile ? <img src="bluemark.svg" alt="" className='w-16 absolute -mt-2 ml-24 z-10' /> : null}
                    <h2 className='text-xl font-semibold z-20'>{shortJudul}</h2>
                    <p className='text-sm text-gray-600'>{shortPengarang}</p>
                </div>
            </div>
        </>
    )
}

export default Book