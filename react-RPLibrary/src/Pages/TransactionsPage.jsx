import React, { useState } from 'react'
import UseGet from '../Axios/UseGet'
import { link } from '../Axios/link';
import LoadingAnimation from '../Components/LoadingAnimation';

function TransactionsPage() {
    const [idUser, setIdUser] = useState(sessionStorage.getItem('iduser') || null);

    const [orders] = UseGet(`/order/${idUser}`)
    const [orderDetails] = UseGet(`/orderdetail`)
    console.log(orders);


    return (
        <>
            <div className="row">
                <h1 className='text-5xl ml-8 mb-4 row justify-start font-extrabold'>Your Transactions</h1>
            </div>
            <div className="container bg-base-200 rounded-box p-4 m-4">
                {
                    orders.data ? (
                        orders.data.length > 0 ? (
                            orders.data.map((order, index) => {
                                let jumlahOrder = 0;
                                let subtotal = 0;
                                return (
                                    <div className="collapse collapse-plus bg-base-100 w-full my-2" key={order.idorder}>
                                        <input type="checkbox" />
                                        <div className="collapse-title text-xl font-medium">Order<span className='text-sm ml-2 opacity-50'>#{order.tglorder}</span></div>
                                        <div className="collapse-content w-full flex">
                                            <div className="col-8 my-4">
                                                {orderDetails.data?.filter((orderDetail) => orderDetail.idorder == order.idorder).map((orderDetail, index) => {
                                                    jumlahOrder += orderDetail.jumlah
                                                    subtotal += orderDetail.harga * orderDetail.jumlah
                                                    return (
                                                        <div className="mx-4" key={orderDetail.idorderdetail}>
                                                            <div className='flex w-fit'>
                                                                <p className="text-2xl mt-3 mx-4 font-bold">{index + 1}</p>
                                                                <div>
                                                                    <p className='text-2xl w-fit'>{orderDetail.judul}</p>
                                                                    <p className='text-sm opacity-50'>{orderDetail.jumlah} book(s) @ {Number(orderDetail.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                                                                </div>
                                                            </div>
                                                            <div className="divider"></div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="col-4 rounded-box bg-base-200 p-6 text-center">
                                                <div className="flex justify-between">
                                                    <p className='text-lg'>Subtotal <span className='italic text-sm opacity-80'>({jumlahOrder} items)</span></p>
                                                    <p className='text-lg'>{subtotal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className='text-lg'>Tax <span className='italic text-sm opacity-80'>(11%)</span></p>
                                                    <p className='text-lg'>{(subtotal * 0.11).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                                                </div>
                                                <div className="flex justify-between mt-4">
                                                    <p className='text-lg'>Total</p>
                                                    <p className='text-lg font-bold'>{order.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                                                </div>
                                                {}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })) : <div className="text-3xl font-bold text-center">No Transaction</div>
                    ) : <div className="w-full flex justify-center"><LoadingAnimation /></div>
                }
            </div>
        </>
    )
}

export default TransactionsPage