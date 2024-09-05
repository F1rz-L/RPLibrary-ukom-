import React, { useEffect, useState } from 'react'
import UseGet from '../Axios/UseGet'
import { link } from '../Axios/link'
import LoadingAnimation from './LoadingAnimation'

function AdminBorrow(props) {
    const [borrows, setBorrows] = useState(props.borrows)
    const [users, setUsers] = useState(props.users)

    useEffect(() => {
        setUsers(props.users)
        setBorrows(props.borrows)
    }, [props.users, props.borrows])

    function statusChecker(status) {
        if (status == 0) {
            return <div className="badge badge-success py-5 text-white">OnTime</div>
        } else if (status == 1) {
            return <div className="badge badge-error py-5 text-white">Late</div>
        } else {
            return <div className="badge badge-unknown">Unknown</div>
        }
    }

    function returnBook(idPinjaman) {
        link.get(`/kembalikan/${idPinjaman}`).then((res) => {
            console.log(res.data);
            window.location.reload();
        }).catch((error) => {
            console.error('Error:', error);
        })
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

                    {borrows?.data?.length > 0 ? borrows.data.map((borrow, index) => {
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
                                <td>{Number(borrow?.denda).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                                <td>
                                    <button onClick={() => returnBook(borrow?.idpinjaman)} className="btn btn-success text-white btn-sm">Return</button>
                                </td>
                            </tr>
                        )
                    }) : <th colSpan={9} className='text-center text-xl'>
                        No Borrowments
                    </th>
                    }
                </tbody>
            </table>
        </>
    )
}

export default AdminBorrow