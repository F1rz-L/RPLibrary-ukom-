import React, { useEffect, useState } from 'react'
import UseGet from '../Axios/UseGet'
import { link } from '../Axios/link'
import { useNavigate } from 'react-router-dom'

function CartPage() {
    const navigate = useNavigate()
    const [daftarBuku] = UseGet('/buku')
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [jumlahCart, setJumlahCart] = useState(0)

    const taxRate = 0.11; // 11% tax rate
    let subtotal = 0;
    let taxation = 0;

    useEffect(() => {
        const cartData = JSON.parse(sessionStorage.getItem('cart'));
        setCart(cartData || []);
    }, []);

    function handleDelete(index) {
        let updatedCart = [...cart];
        updatedCart.splice(index, 1);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    }

    function handleQuantityChange(index, quantity) {
        if (quantity <= 0) {
            handleDelete(index);
            return;
        } else {
            let updatedCart = [...cart];
            updatedCart[index].jumlah = quantity;
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
    }

    function calculateSubtotal() {
        cart.forEach(item => {
            const buku = daftarBuku?.data?.[item.id - 1];
            if (buku) {
                subtotal += Number(buku.harga) * item.jumlah;
            }
        });

        return subtotal
    }

    function calculateTax() {
        taxation = subtotal * taxRate;
        return taxation
    }

    function calculateTotal() {
        const total = subtotal + taxation;

        return total
    }

    useEffect(() => {
        let jumlah = 0
        cart.forEach(item => {
            jumlah += item.jumlah
        })
        setJumlahCart(jumlah);
    }, [cart]);

    function handleCheckout() {
        const tglorder = new Date().toISOString().slice(0, 10);
        const formattedId = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '');

        const order = {
            idorder: formattedId,
            iduser: sessionStorage.getItem('iduser'),
            tglorder: tglorder.toString(),
            total: calculateTotal(),
            status: 0,
        }

        const orderDetail = cart.map(item => {
            return {
                idorder: formattedId,
                idbuku: item.id,
                jumlah: item.jumlah
            }
        })

        console.log(orderDetail);
        orderDetail.forEach(item => {
            link.post('/orderdetail', item
            ).then(res => {
                console.log(res.data);
            })
        })
        link.post('/order', order
        ).then(res => {
            console.log(res.data);
            setCart([]);
            sessionStorage.setItem('cart', "[]");
            navigate('/')
            window.location.reload()
        })
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

        return cart?.map((item, index) => {
            const buku = daftarBuku?.data?.[item?.id - 1]
            if (!buku) return null;
            // console.log(buku?.judul + " : " + index);

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
                                <h3 className='font-bold text-3xl'>{Number(buku.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}<span className='text-lg font-normal'>/pcs</span></h3>
                                <div className='flex py-2'>
                                    <div className='bg-base-200 rounded-box flex font-bold'>
                                        <button className="btn btn-sm btn-square btn-ghost" onClick={() => handleQuantityChange(index, item.jumlah - 1)}>-</button>
                                        <p className='text-lg pt-1 px-2'>{item.jumlah}</p>
                                        <button className="btn btn-sm btn-square btn-ghost" onClick={() => handleQuantityChange(index, item.jumlah + 1)}>+</button>
                                    </div>
                                    {/* delete button */}
                                    <button className="btn mx-2 btn-sm btn-square btn-ghost" onClick={() => handleDelete(index)}>X</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                </div>
            );
        });
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
                                <p className='text-lg'>Subtotal <span className='italic text-sm'>({jumlahCart} items)</span></p>
                                <p className='text-lg'>{calculateSubtotal().toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className='text-lg'>Tax <span className='italic text-sm'>(11%)</span></p>
                                <p className='text-lg'>{calculateTax().toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p className='text-lg'>Total</p>
                                <p className='text-lg font-bold'>{calculateTotal().toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                            </div>
                        </div>
                        <div className="row flex justify-center mx-8 my-4">
                            <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage