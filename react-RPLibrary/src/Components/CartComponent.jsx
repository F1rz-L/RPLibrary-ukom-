import React from 'react'
import { link } from '../Axios/link'

function CartComponent(props) {

    const isi = link.get(`/buku/${props.idbuku}`)
    console.log(isi);

    return (
        <>
            <div className="rounded-box flex">
                <img className='max-w-28 max-h-32 rounded-box' src="https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg" />
                <div className='mx-6 w-full h-full flex flex-col justify-between'>
                    <div>
                        <h3 className="font-bold text-2xl">{}</h3>
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
        </>
    )
}

export default CartComponent