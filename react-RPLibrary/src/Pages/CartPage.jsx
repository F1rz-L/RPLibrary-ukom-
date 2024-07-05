import React, { useEffect, useState } from 'react'
import UseGet from '../Axios/UseGet'
import { link } from '../Axios/link'

function CartPage() {
    const [daftarBuku] = UseGet('/buku')
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    let subtotal = 0;

    useEffect(() => {
        const cartData = JSON.parse(sessionStorage.getItem('cart'));
        setCart(cartData || []);
    }, []);

    function calculateSubtotal() {
    
        cart.forEach(id => {
            const buku = daftarBuku?.data?.[id];
            if (buku) {
                console.log(`Adding harga ${buku.harga} for buku with id ${id}`);
                subtotal += Number(buku.harga);
                console.log(`Current subtotal: ${subtotal}`);
            }
        });
    
        return subtotal;
    }

    function calculateTax() {
        const taxRate = 0.1; // 10% tax rate
        return subtotal * taxRate;
    }

    function calculateTotal(subtotal, tax) {
        return subtotal + tax;
    }


    function cartContent() {
        if (cart.length === 0) {
            return (
                <div className="text-3xl font-bold text-center">
                    Your cart is empty
                </div>
            );
        }

        if (!daftarBuku) {
            return (
                <div className="text-3xl font-bold text-center">
                    Loading...
                </div>
            );
        }

        return cart?.map((id, index) => {
            const buku = daftarBuku?.data?.[id - 1]
            if (!buku) return null;

            return (
                <div key={index}>
                    <div className="rounded-box flex">
                        <img className='max-w-28 max-h-32 rounded-box' src={buku.cover} />
                        <div className='mx-6 w-full h-full flex flex-col justify-between'>
                            <div>
                                <h3 className="font-bold text-2xl">{buku.judul}</h3>
                                <p className="text-sm">by {buku.pengarang}</p>
                            </div>
                            <div className='flex-row justify-between flex'>
                                <h3 className='font-bold text-3xl'>{buku.harga}<span className='text-lg font-normal'>/pcs</span></h3>
                                <div className='flex py-2'>
                                    <div className='bg-base-200 rounded-box flex font-bold'>
                                        <button className="btn btn-sm btn-square btn-ghost">-</button>
                                        <p className='text-lg pt-1 px-2'>1</p>
                                        <button className="btn btn-sm btn-square btn-ghost">+</button>
                                    </div>
                                    {/* delete button */}
                                    <button className="btn mx-2 btn-sm btn-square btn-ghost">X</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                </div>
            );
        });
    }

    useEffect(() => {
        console.log('Daftar Buku:', daftarBuku);
        console.log('Cart:', cart);
    }, [daftarBuku, cart]);

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
                                <p className='text-lg'>{calculateSubtotal()}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='text-lg'>Tax <span className='italic text-sm'>(10%)</span></p>
                                <p className='text-lg'>{calculateTax()}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className='text-lg'>Total</p>
                                <p className='text-lg font-bold'>{calculateTotal(calculateSubtotal(), calculateTax())}</p>
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