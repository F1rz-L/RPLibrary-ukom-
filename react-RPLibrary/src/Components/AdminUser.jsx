import React, { useEffect, useState } from 'react';
import UseGet from '../Axios/UseGet';
import { faBars, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { link } from '../Axios/link';
import LoadingAnimation from './LoadingAnimation';
import DataTable from 'datatables.net-dt';
// import 'datatables.net-dt/css/dataTables.min.css'; // Import DataTables CSS

function AdminUser(props) {
    const [users, setUsers] = useState(props.users);

    useEffect(() => {
        setUsers(props.users);
    }, [props.users]);

    useEffect(() => {
        // Initialize DataTable
        const table = new DataTable('#adminUserTable', {
            // Customize your DataTable options here
            // e.g., responsive: true
        });

        // Clean up DataTable on component unmount
        return () => {
            if (table) {
                table.destroy();
            }
        };
    }, [users.data]); // Reinitialize DataTable when users data changes

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
                return (<td><div className="badge badge-primary">Admin</div></td>);
            case 1:
                return (<td><div className="badge badge-outline">User</div></td>);
            case 2:
                return (<td><div className="badge badge-secondary">Bluemark</div></td>);
            default:
                return null;
        }
    }

    return (
        <>
            <table id="adminUserTable" className="table">
                <thead>
                    <tr className="text-center">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Interact</th>
                    </tr>
                </thead>
                <tbody className='pb-4'>
                    {
                        users.data ? (users.data.map((user, index) => {
                            return (
                                <tr key={index} className="text-center hover">
                                    <td>{index + 1}</td>
                                    <td>{user?.nama}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.alamat}</td>
                                    {Math.sign(Number(user?.saldo)) === -1 ? 
                                        <td className='text-red-600'>
                                            {Number(user?.saldo).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                        </td> 
                                        : 
                                        <td>
                                            {Number(user?.saldo).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                        </td>
                                    }
                                    {getStatus(user?.status)}
                                    <td>
                                        <div className="dropdown dropdown-right">
                                            <div tabIndex={0} role="button" className="btn btn-accent">
                                                <FontAwesomeIcon icon={faBars} />
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu ml-2 shadow border-4 border-base-200 bg-base-100 rounded-box">
                                                {user?.status === 0 ? null : 
                                                    <li onClick={() => switchuser(user?.id, user?.status)}>
                                                        <a><FontAwesomeIcon icon={faEdit} /> Make Admin</a>
                                                    </li>
                                                }
                                                {user?.status === 1 ? null : 
                                                    <li onClick={() => switchuser(user?.id, user?.status)}>
                                                        <a><FontAwesomeIcon icon={faEdit} /> Make User</a>
                                                    </li>
                                                }
                                                <li onClick={() => deleteUser(user?.id)}>
                                                    <a><FontAwesomeIcon icon={faTrash} /> Delete</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }))
                        : (
                            <tr colSpan={7} className='flex justify-center text-center'>
                                <LoadingAnimation />
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default AdminUser;
