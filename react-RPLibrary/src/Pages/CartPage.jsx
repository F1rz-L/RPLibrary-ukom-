import React, { useState } from 'react'
import UseGet from '../Axios/UseGet'
import { link } from '../Axios/link'

function CartPage() {
    const [daftarBuku] = UseGet('/buku')
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')))

    function cartContent() {
        // if (cart) {
            cart?.map((id, index) => {
                // const buku = daftarBuku?.data[id]

                return (
                    <div key={index}>
                        <div className="rounded-box flex">
                            <img className='max-w-28 max-h-32 rounded-box' src="https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg" />
                            <div className='mx-6 w-full h-full flex flex-col justify-between'>
                                <div>
                                    {/* <h3 className="font-bold text-2xl">{buku.judul}</h3> */}
                                    <p className="text-sm">by Morgan Maxwell</p>
                                </div>
                                <div className='flex-row justify-between flex'>
                                    <h3 className='font-bold text-3xl'>Rp56.000<span className='text-lg font-normal'>/pcs</span></h3>
                                    <div className='flex'>
                                        <div className='bg-base-200 rounded-box flex font-bold'>
                                            <button className="btn btn-sm btn-square btn-ghost pt-1">-</button>
                                            <p className='text-xl pt-1 px-2'>1</p>
                                            <button className="btn btn-sm btn-square btn-ghost pt-1">+</button>
                                        </div>
                                        {/* delete button */}
                                        <button className="btn btn-sm btn-square btn-ghost">X</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>
                )
            })
        // } else {
        //     return (
        //         <div className="text-3xl font-bold text-center">
        //             Your cart is empty
        //         </div>
        //     )
        // }
    }

    return (
        <>
            <div className="row">
                <h1 className='text-5xl ml-8 mb-4 row justify-start font-extrabold'>Your Cart</h1>
            </div>
            <div className="row justify-center">
                <div className="col-8 m-4">
                    <div className="row w-full">
                        {cartContent()}
                    </div>
                </div>
                <div className="col-3 h-full sticky top-0">
                    <div className="h-full py-4 my-4 bg-base-200 rounded-box">
                        <h2 className='text-4xl text-center font-bold mt-4'>Total</h2>
                        <div className="divider mt-1"></div>
                        <div className='text-neutral-600 text-sm mx-4'>
                            <div className="flex justify-between">
                                <p className='text-lg'>Subtotal <span className='italic text-sm'>({cart?.length} items)</span></p>
                                <p className='text-lg'>Rp56.000</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='text-lg'>Tax <span className='italic text-sm'>(10%)</span></p>
                                <p className='text-lg'>Rp5.600</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className='text-lg'>Total</p>
                                <p className='text-lg font-bold'>Rp61.600</p>
                            </div>
                        </div>
                        <div className="row flex justify-center mx-8 my-4">
                            <button className="btn btn-primary">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage