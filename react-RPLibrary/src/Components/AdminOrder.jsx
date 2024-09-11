import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCheckToSlot, faEdit, faMagnifyingGlassDollar, faTrash, faTruck } from '@fortawesome/free-solid-svg-icons';
import { link } from '../Axios/link';
import DataTable from 'react-data-table-component';
import LoadingAnimation from './LoadingAnimation';

function AdminOrder(props) {
    const [orders, setOrders] = useState(props.orders);
    const [users, setUsers] = useState(props.users);
    const [orderDetails, setOrderDetails] = useState(props.orderDetails);

    useEffect(() => {
        setUsers(props.users);
        setOrderDetails(props.orderDetails);
        setOrders(props.orders);
    }, [props.users, props.orderDetails, props.orders]);

    function deleteOrder(idorder) {
        link.delete(`/order/${idorder}`).then(() => {
            window.location.reload();
        });
    }

    function getStatus(status) {
        switch (status) {
            case 0:
                return (<div className="badge badge-error text-white text-nowrap">On Process</div>)
            case 1:
                return (<div className="badge badge-outline text-nowrap">On Delivery</div>)
            case 2:
                return (<div className="badge badge-secondary text-nowrap">Completed</div>)
            default:
                return <div className="badge badge-unknown text-nowrap">Unknown</div>;
        }
    }

    function calculateTotal(detail) {
        let total = 0;
        total += detail.harga * detail.jumlah;
        total += total * 0.11;
        return total;
    }

    function submitInteract(idorder, status) {
        link.get(`/order/${idorder}/${status}`).then(() => {
            window.location.reload();
        });
    }

    function checkInteraction(idorder, status) {
        switch (status) {
            case 0:
                return (
                    <li><a className='text-nowrap' onClick={() => submitInteract(idorder, 1)}><FontAwesomeIcon icon={faTruck} />Deliver</a></li>
                );
            case 1:
                return (
                    <li><a className='text-nowrap' onClick={() => submitInteract(idorder, 2)}><FontAwesomeIcon icon={faCheckToSlot} />Complete</a></li>
                );
            default:
                return null;
        }
    }


    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            sortable: true,
            center: true,
            compact: true
        },
        {
            name: 'Buyer',
            selector: row => users?.data?.find(user => user.id === row.iduser)?.nama || 'Unknown User',
            sortable: true,
            center: true,
        },
        {
            name: 'Order Date',
            selector: row => row.tglorder,
            sortable: true,
            center: true,
        },
        {
            name: 'Total',
            selector: row => Number(row.total),
            sortable: true,
            center: true,
            cell: row => Number(row.total).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            center: true,
            cell: row => getStatus(row.status),
        },
        {
            name: 'Detail',
            cell: row => (
                <>
                    <dialog id={`orderDetailModal${row.idorder}`} className="modal">
                        <div className="modal-box w-5/6 max-w-5xl h-5/6 overflow-hidden">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
                                    {orderDetails?.data?.filter(detail => detail.idorder === row.idorder)?.map((detail, index) => (
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
                            <button>Close</button>
                        </form>
                    </dialog>
                    <button className="btn btn-primary" onClick={() => document.getElementById(`orderDetailModal${row.idorder}`).showModal()}>
                        <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
                    </button>
                </>
            ),
            center: true,
        },
        {
            name: 'Interact',
            cell: row => (
                <div className="dropdown dropdown-right my-2">
                    <div tabIndex={0} role="button" className="btn btn-accent">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu ml-2 shadow border-4 border-base-200 bg-base-100 rounded-box">
                        {checkInteraction(row.idorder, row.status)}
                        <li>
                            <a className="text-nowrap" onClick={() => deleteOrder(row?.idorder)}>
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </a>
                        </li>
                    </ul>
                </div>
            ),
            center: true,
        }

    ];

    return (
        <>
            <div className="stats shadow-lg mb-4 w-full">
                <div className="stat">
                    <div className="stat-title">Order Count</div>
                    <div className="stat-value">{orders.data?.length}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">On Process</div>
                    <div className="stat-value">{orders.data?.filter(order => order.status === 0).length}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">On Delivery</div>
                    <div className="stat-value">{orders.data?.filter(order => order.status === 1).length}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Completed</div>
                    <div className="stat-value">{orders.data?.filter(order => order.status === 2).length}</div>
                </div>
            </div>
            {orders.data ?
                orders.data.length > 0 ?
                <DataTable
                    columns={columns}
                    data={orders?.data || []}
                    pagination
                    highlightOnHover
                    responsive
                    className="table table-zebra w-full"
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                    customStyles={{
                        rows: {
                            style: {
                                backgroundColor: "#ece3ca", // Base background color
                                transition: "background-color 0.15s ease-in-out",
                            },
                            highlightOnHoverStyle: {
                                backgroundColor: "#e4d8b4",
                                transitionDuration: '0.15s',
                                borderBottomColor: "#e4d8b4",
                                outlineStyle: 'none',
                                outlineWidth: '0px',
                            },
                        },
                        headCells: {
                            style: {
                                backgroundColor: "#ece3ca",
                                fontWeight: "bold",
                            },
                        },
                        pagination: {
                            style: {
                                backgroundColor: "#ece3ca",
                            },
                        },
                    }}
                /> :    
                <div className='font-bold w-full flex justify-center text-xl'>
                    No Data
                </div>
                 : (
                    <div className='w-full flex justify-center'>
                        <LoadingAnimation />
                    </div>
                )}
        </>
    );
}

export default AdminOrder;
