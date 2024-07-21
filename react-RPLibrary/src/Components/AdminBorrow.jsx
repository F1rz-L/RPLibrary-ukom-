import React, { useEffect, useState } from 'react'
import UseGet from '../Axios/UseGet'

function AdminBorrow(props) {
    const [borrows] = UseGet('/pinjam/index')
    const [users, setUsers] = useState(props.users)

    useEffect(() => {
        setUsers(props.users)
    }, [props.users])

    function statusChecker(status) {
        if (status == 0) {
            return <div className="badge badge-success py-5 text-white">OnTime</div>
        } else if (status == 1) {
            return <div className="badge badge-error py-5 text-white">Late</div>
        }else {
            return <div className="badge badge-unknown">Unknown</div>
        }
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr className="text-center">
                        <th>#</th>
                        <th>Cover</th>
                        <th>Book</th>
                        <th>Lender</th>
                        <th colSpan={2}>Borrowing Timespan</th>
                        <th>Status</th>
                        <th>Penalty</th>
                        <th>Interact</th>
                    </tr>
                </thead>
                <tbody>

                    {borrows?.data?.map((borrow, index) => {
                        return (
                            <tr className="text-center hover" key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img className='max-w-28 max-h-32 rounded-box' src={borrow?.cover} />
                                </td>
                                <td>{borrow?.judul}</td>
                                <td>{users?.data?.find(user => user?.id === borrow?.idpeminjam)?.nama}</td>
                                <td>{new Date(borrow?.tglpinjam).toLocaleDateString("id-ID")}</td>
                                <td>{new Date(borrow?.tglkembali).toLocaleDateString("id-ID")}</td>
                                <td>{statusChecker(borrow?.status)}</td>
                                <td>{borrow?.denda}</td>
                                <td>
                                    <button className="btn btn-success btn-sm">Return</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default AdminBorrow