import React from 'react'

function Book() {
    return (
        <>
            <dialog id="bookInfoModal" className="modal">
                <div className="modal-box w-5/6 max-w-5xl h-5/6 overflow-hidden">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="row">
                        <div className='rounded-lg col-4 glass flex justify-center align-middle'>
                            <img src="https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg" className='max-h-[75svh]' alt="" />
                        </div>
                        <div className="col-8 h-fit flex flex-col justify-between">
                            <div className='mx-8'>
                                <h3 className="font-bold text-4xl">Alone : A True Story</h3>
                                <p className="text-sm">by Morgan Maxwell</p>
                            </div>
                            <div className="flex w-fit h-fit mx-4 flex-col justify-center p-4 rounded-box my-4 bg-base-200 ">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quos quam et, laboriosam quibusdam illo perferendis exercitationem hic possimus totam ipsa nam, saepe consequuntur magnam non fugiat deserunt. Minima, animi!</p>
                                <div className="divider" />
                                <div className='flex justify-center '>
                                    <p>118 Page(s)</p>
                                    <div className="divider divider-horizontal" />
                                    <p>English</p>
                                    <div className="divider divider-horizontal" />
                                    <div className="badge badge-secondary mx-1">Documentary</div>
                                    <div className="badge badge-secondary mx-1">Drama</div>
                                    <div className="divider divider-horizontal" />
                                    <p>2022</p>
                                </div>
                                <div className="divider"></div>
                                <div className='flex justify-center '>
                                    <p>ISBN13: XXX-X-XXX-XXX-X</p>
                                    <div className="divider divider-horizontal" />
                                    <p>PT. Dramedia Pustaka Utama</p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between px-8">
                                <div className='flex flex-col'>
                                    <h2 className='col-8 font-bold text-4xl -mt-3'>Rp56.000</h2>
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
            <div id='book' onClick={() => document.getElementById('bookInfoModal').showModal()} className='w-36 h-64 bg-base-100 mx-2 my-2 cursor-pointer rounded-box '>
                <div className="w-36 h-48 bg-base-300 row flex justify-center align-middle rounded-t-box">
                    <img src="https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg" className='max-w-36 max-h-48 overflow-hidden ' />
                </div>
                <div className="row mt-2 flex justify-center">
                    <h2 className='text-xl font-semibold'>Alone : A Tr...</h2>
                    <p className='text-sm text-gray-600'>Morgan Maxwell</p>
                </div>
            </div>
        </>
    )
}

export default Book