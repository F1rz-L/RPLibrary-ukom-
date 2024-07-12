import React from 'react'
import UseGet from '../Axios/UseGet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

function AdminOrder() {
    const [orders] = UseGet('/order')
    const [users] = UseGet('/user')

    function getStatus(status) {
        switch (status) {
            case 0:
                return (<td><div className="badge badge-error text-white">Pesanan Diproses</div></td>)
                break;
            case 1:
                return (<td><div className="badge badge-outline">Dalam Perjalanan</div></td>)
                break;
            case 2:
                return (<td><div className="badge badge-secondary">Pesanan Sampai</div></td>)
                break;
            default:
                break;
        }
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
                    {orders?.data?.map((order, index) => (
                        <tr key={index} className="text-center hover">
                            <th>{index + 1}</th>
                            <td>{users?.data?.[order?.iduser - 1]?.nama}</td>
                            <td>{order?.tglorder}</td>
                            <td>{Number(order?.total).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                            {getStatus(order?.status)}
                            <td><button className="btn btn-primary">Detail</button></td>
                            <td>
                                <div className="dropdown dropdown-right">
                                    <div tabIndex={0} role="button" className="btn btn-accent"><FontAwesomeIcon icon={faBars} /></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu ml-2 shadow border-4 border-base-200 bg-base-100 rounded-box">
                                        <li><a><FontAwesomeIcon icon={faEdit} /> Edit</a></li>
                                        {/* <li><a><FontAwesomeIcon icon={faTrash} onClick={() => deleteUser()} /> Delete</a></li> */}
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AdminOrder