import React from 'react'
import UseGet from '../Axios/UseGet'
import { faBars, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { link } from '../Axios/link'

function AdminUser() {
    const [user] = UseGet('/user')

    function deleteUser(id) {
        link.delete(`/user/${id}`).then(() => {
            console.log(`deleted ${id}`);
            window.location.reload()
        })
    }

    function getStatus(status) {
        switch (status) {
            case 0:
                return (<td><div className="badge badge-primary">Admin</div></td>)
                break;
            case 1:
                return (<td><div className="badge badge-outline">User</div></td>)
                break;
            case 2:
                return (<td><div className="badge badge-secondary">Bluemark</div></td>)
                break;
            default:
                break;
        }
    }

    function editUser(id) {

    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Interact</th>
                    </tr>
                    {/* <div className='divider '></div> */}
                </thead>
                <tbody className='pb-4'>
                    {user?.data?.map((user, index) => (
                        <tr key={index} className="text-center hover">
                            <th>{index + 1}</th>
                            <td>{user?.nama}</td>
                            <td>{user?.email}</td>
                            <td>{user?.alamat}</td>
                            {getStatus(user?.status)}
                            {/* <div></div> */}
                            <td>
                                <div className="dropdown dropdown-right">
                                    <div tabIndex={0} role="button" className="btn btn-accent"><FontAwesomeIcon icon={faBars} /></div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu ml-2 shadow border-4 border-base-200 bg-base-100 rounded-box">
                                        <li><a><FontAwesomeIcon icon={faEdit} /> Edit</a></li>
                                        <li><a><FontAwesomeIcon icon={faTrash} onClick={() => deleteUser(user?.id)} /> Delete</a></li>
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

export default AdminUser