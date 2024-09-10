import React, { useEffect, useState } from 'react';
import { faBars, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { link } from '../Axios/link';
import LoadingAnimation from './LoadingAnimation';
import DataTable from 'react-data-table-component';

function AdminUser(props) {
    const [users, setUsers] = useState(props.users);

    useEffect(() => {
        setUsers(props.users);
    }, [props.users]);

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            center: true,
            compact: true
        },
        {
            name: 'Name',
            selector: row => row.nama,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            center: true,
            wrap: true
        },
        {
            name: 'Address',
            selector: row => row.alamat,
            sortable: true,
            center: true,
        },
        {
            name: 'Balance',
            selector: row => row?.saldo,
            center: true,
            sortable: true,
            // grow: 2,
            cell: row => Math.sign(Number(row?.saldo)) === -1 ?
                <span className='text-red-600 text-nowrap'>{Number(row?.saldo).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                : <span className=' text-nowrap'>{Number(row?.saldo).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>,
        },
        {
            name: 'Status',
            selector: row => row.status,
            center: true,
            sortable: true,
            cell: row => getStatus(row.status),
        },
        {
            name: 'Interact',
            compact: true,
            cell: (row) => (
                <div className="dropdown dropdown-right">
                    <div tabIndex={0} role="button" className="btn btn-accent my-2">
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu ml-2 shadow border-4 border-base-200 bg-base-100 rounded-box">
                        {row.status !== 0 &&
                            <li onClick={() => switchuser(row.id, row.status)}>
                                <a className='text-nowrap'><FontAwesomeIcon icon={faEdit} /> Make Admin</a>
                            </li>
                        }
                        {row.status !== 1 &&
                            <li onClick={() => switchuser(row.id, row.status)}>
                                <a className='text-nowrap'><FontAwesomeIcon icon={faEdit} /> Make User</a>
                            </li>
                        }
                        <li onClick={() => deleteUser(row.id)}>
                            <a className='text-nowrap'><FontAwesomeIcon icon={faTrash} /> Delete</a>
                        </li>
                    </ul>
                </div>
            ),
            center: true,
        }
    ];

    function deleteUser(id) {
        link.delete(`/user/${id}`).then(() => {
            console.log(`deleted ${id}`);
            window.location.reload();
        });
    }

    function switchuser(idUser, statusUser) {
        link.get(`/user/switchUser/${idUser}`).then((res) => {
            console.log(res.data);
            window.location.reload();
        });
    }

    function getStatus(status) {
        switch (status) {
            case 0:
                return <div className="badge badge-primary">Admin</div>;
            case 1:
                return <div className="badge badge-outline">User</div>;
            case 2:
                return <div className="badge badge-secondary">Bluemark</div>;
            default:
                return null;
        }
    }

    return (
        <>
            <div className="stats shadow-lg mb-4 w-full">
                <div className="stat">
                    <div className="stat-title">All Users</div>
                    <div className="stat-value">{users.data?.length}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Bluemark Count</div>
                    <div className="stat-value">{users.data?.filter(user => user.status === 2).length}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Balance</div>
                    <div className="stat-value">{users.data?.reduce((acc, user) => acc + Number(user.saldo), 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
                </div>
            </div>
            {users.data ? (
                <DataTable
                    columns={columns}
                    data={users.data}
                    pagination
                    highlightOnHover
                    dense
                    className="table"
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
                />
            ) : (
                <div className='w-full flex justify-center'>
                    <LoadingAnimation />
                </div>
            )}
        </>
    );
}

export default AdminUser;
