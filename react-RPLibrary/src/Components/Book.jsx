import React, { useState } from 'react'

function Book(props) {
    function truncateString(str, num) {
        if (str.length > num) {
            let truncStr = str.toString().slice(0, 10) + "...";
            return truncStr;
        } else {
            return str;
        }
    }

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [shortJudul, setShortJudul] = useState(truncateString(props.judul, 10))
    const [longJudul, setLongJudul] = useState(props.judul)
    const [pengarang, setPengarang] = useState(truncateString(props.pengarang, 17))
    const [deskripsi, setDeskripsi] = useState(props.deskripsi)
    const [penerbit, setPenerbit] = useState(truncateString(props.penerbit, 15))
    const [isbn13, setIsbn13] = useState(props.isbn13)
    const [tahunTerbit, setTahunTerbit] = useState(props.tahun_terbit)
    const [cover, setCover] = useState(props.cover)
    const [bahasa, setBahasa] = useState(props.bahasa)
    const [harga, setHarga] = useState(props.harga)
    const [pageNumber, setPageNumber] = useState(props.page_number)


    return (
        <>
            <dialog id="bookInfoModal" className="modal">
                <div className="modal-box w-5/6 max-w-5xl h-5/6 overflow-hidden">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="row">
                        <div className='rounded-lg col-4 glass flex justify-center align-middle'>
                            <img src={`${cover}`} className='max-h-[75svh]' alt="" />
                        </div>
                        <div className="col-8 h-fit flex flex-col justify-between overflow-y-auto">
                            <div className='mx-8'>
                                <h3 className="font-bold text-4xl">{props.judul}</h3>
                                <p className="text-sm">By {pengarang}</p>
                            </div>
                            <div className="flex w-fit h-fit mx-4 flex-col justify-center p-4 rounded-box my-4 bg-base-200 ">
                                <p>{deskripsi}</p>
                                <div className="divider" />
                                <div className='flex justify-center '>
                                    <p>{pageNumber} Page(s)</p>
                                    <div className="divider divider-horizontal" />
                                    <p className='uppercase'>{bahasa}</p>
                                    <div className="divider divider-horizontal" />
                                    <div className="badge badge-secondary mx-1">Documentary</div>
                                    <div className="badge badge-secondary mx-1">Drama</div>
                                    <div className="divider divider-horizontal" />
                                    <p>{tahunTerbit}</p>
                                </div>
                                <div className="divider"></div>
                                <div className='flex justify-center '>
                                    <p>ISBN13: {isbn13}</p>
                                    <div className="divider divider-horizontal" />
                                    <p>{penerbit}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between px-8">
                                <div className='flex flex-col'>
                                    <h2 className='col-8 font-bold text-4xl -mt-3'>Rp{harga}</h2>
                                    <div className="rating mt-2">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    </div>
                                </div>
                                <button className="btn btn-primary col-4">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            
            <div id='book' onClick={() => {
                document.getElementById('bookInfoModal').showModal()
                setModalIsOpen(true)
                }} className='w-36 h-64 bg-base-100 mx-2 my-2 cursor-pointer rounded-box'>
                <div className="w-36 h-48 bg-base-300 row flex justify-center align-middle rounded-t-box">
                    <img src={`${cover}`} className='max-w-36 max-h-48 overflow-hidden ' />
                </div>
                <div className="row mt-2 flex justify-center">
                    <h2 className='text-xl font-semibold'>{shortJudul}</h2>
                    <p className='text-sm text-gray-600'>{pengarang}</p>
                </div>
            </div>
        </>
    )
}

export default Book