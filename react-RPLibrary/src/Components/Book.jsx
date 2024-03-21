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
                        <img src="https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg" className='rounded-lg col-4 max-h-[75svh]' alt="" />
                        <div className="col-8">
                            <h3 className="font-bold text-2xl">Alone : A True Story</h3>
                            <p className="">by Morgan Maxwell</p>
                            <div className="flex w-fit h-fit flex-col justify-center p-4 rounded-box my-4 bg-base-200 ">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit quos quam et, laboriosam quibusdam illo perferendis exercitationem hic possimus totam ipsa nam, saepe consequuntur magnam non fugiat deserunt. Minima, animi!</p>
                                <div className="divider" />
                                <div className='flex justify-center '>
                                    <p>118 Page(s)</p>
                                    <div className="divider divider-horizontal" />
                                    <p>English</p>
                                </div>
                            </div>
                            <div className="row mt-4 flex justify-evenly h-full align-bottom">
                                <h2 className='col-8 font-bold text-4xl'>Rp56.000</h2>
                                <button className="btn btn-primary col-4">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <div id='book' onClick={() => document.getElementById('bookInfoModal').showModal()} className='w-36 h-48 bg-base-200 mx-2 my-2 cursor-pointer rounded-box'>
                <img src="https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg" className='rounded-box overflow-hidden ' />
            </div>
        </>
    )
}

export default Book