import React, { useEffect, useState } from 'react'
import UseGet from '../Axios/UseGet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEdit, faMagnifyingGlassDollar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { link } from '../Axios/link'

function AdminOrder(props) {
    const [orders, setOrders] = useState(props.orders)
    const [users, setUsers] = useState(props.users)
    const [orderDetails, setOrderDetails] = useState(props.orderDetails)

    useEffect(() => {
        setUsers(props.users)
        setOrderDetails(props.orderDetails)
        setOrders(props.orders)
    }, [props.users, props.orderDetails, props.orders])

    function deleteOrder(idorder){
        link.delete(`/order/${idorder}`).then(() => {
            window.location.reload();
        })
    }

    function getStatus(status) {
        switch (status) {
            case 0:
                return (<td><div className="badge badge-error text-white">On Process</div></td>)
            case 1:
                return (<td><div className="badge badge-outline">On Delivery</div></td>)
            case 2:
                return (<td><div className="badge badge-secondary">Completed</div></td>)
            default:
                return <td><div className="badge badge-unknown">Unknown</div></td>;
        }
    }

    function calculateTotal(detail){
        let total = 0

        total += detail.harga * detail.jumlah
        total += total * 0.11

        return total;
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th>#</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Detail</th>
                        <th>Interact</th>
                    </tr>
                </thead>
                <tbody className='pb-4'>
                    {orders?.data?.length > 0 ? orders?.data?.map((order, index) => (
                        // <>
                        <tr key={index} className="text-center hover">

                            <th>{index + 1}</th>
                            <td>{users?.data?.find(user => user.id === order.iduser)?.nama || 'Unknown User'}</td>
                            <td>{order?.tglorder}</td>
                            <td>{Number(order?.total).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                            {getStatus(order?.status)}
                            <td>
                                <dialog id={`orderDetailModal${order?.idorder}`} className="modal">
                                    <div className="modal-box w-5/6 max-w-5xl h-5/6 overflow-hidden">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
                                            }}>✕</button>
                                        </form>
                                        <table className="table">
                                            <thead>
                                                <tr className="text-center">
                                                    <th>#</th>
                                                    <th>Book</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total + Tax</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderDetails?.data?.filter(detail => detail.idorder === order?.idorder)?.map((detail, index) => (
                                                    <tr key={index} className="text-center">
                                                        <th>{index + 1}</th>
                                                        <td>{detail?.judul}</td>
                                                        <td>{Number(detail?.harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                                        <td>{detail?.jumlah}</td>
                                                        <td>{Number(calculateTotal(detail)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button onClick={() => {
                                        }}>close</button>
                                    </form>
                                </dialog>

                                <button className="btn btn-primary" onClick={() => {
                                    document.getElementById(`orderDetailModal${order?.idorder}`).showModal()
                                }}><FontAwesomeIcon icon={faMagnifyingGlassDollar} /></button></td>
                            <td>
                                <div className="dropdown dropdown-right">
                                    <div tabIndex={0} role="button" className="btn btn-accent"><FontAwesomeIcon icon={faBars} /></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu ml-2 shadow border-4 border-base-200 bg-base-100 rounded-box">
                                        <li><a><FontAwesomeIcon icon={faEdit} /> Edit</a></li>
                                        <li><a onClick={() => deleteOrder(order?.idorder)()}><FontAwesomeIcon icon={faTrash} /> Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        // </>
                    )) : (
                        <th colSpan={7} className='text-xl text-center'>No Orders</th>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default AdminOrder