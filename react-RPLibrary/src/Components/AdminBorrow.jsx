import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { link } from '../Axios/link';
import LoadingAnimation from './LoadingAnimation';

function AdminBorrow(props) {
    const [borrows, setBorrows] = useState(props.borrows);
    const [users, setUsers] = useState(props.users);

    useEffect(() => {
        setUsers(props.users);
        setBorrows(props.borrows);
    }, [props.users, props.borrows]);

    function statusChecker(status) {
        if (status === 0) {
            return <div className="badge badge-success py-5 text-white">OnTime</div>;
        } else if (status === 1) {
            return <div className="badge badge-error py-5 text-white">Late</div>;
        } else {
            return <div className="badge badge-unknown">Unknown</div>;
        }
    }

    function returnBook(idPinjaman) {
        link.get(`/kembalikan/${idPinjaman}`).then((res) => {
            console.log(res.data);
            window.location.reload();
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    // Define columns for DataTable
    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            center: true,
            compact: true
        },
        {
            name: 'Cover',
            selector: row => <img className='w-18 rounded-box my-2' src={row.cover} alt="Cover" />,
            center: true,
        },
        {
            name: 'Book',
            selector: row => row.judul,
            center: true,
            sortable: true,
            wrap: true

        },
        {
            name: 'Lender',
            selector: row => users?.data?.find(user => user.id === row.idpeminjam)?.nama || 'Unknown',
            center: true,
            sortable: true,
        },
        {
            name: 'Borrowing Timespan',
            selector: row => (
                <>
                    <div>{new Date(row.tglpinjam).toLocaleDateString("id-ID")}</div>
                    <div>{new Date(row.tglkembali).toLocaleDateString("id-ID")}</div>
                </>
            ),
            center: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            center: true,
            cell: row => statusChecker(row.status),
            sortable: true,
        },
        {
            name: 'Penalty',
            selector: row => row.denda,
            center: true,
            sortable: true,
            cell: row => <div>{row.denda > 0 ? <span className='text-error font-bold'>{Number(row.denda).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span> : <span className=''>{Number(row.denda).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>}</div>,
        },
        {
            name: 'Interact',
            cell: row => (
                <button onClick={() => returnBook(row.idpinjaman)} className="btn btn-success text-white btn-sm">Return</button>
            ),
            center: true,
        },
    ];

    return (
        <>
            {borrows.data ? <DataTable
                columns={columns}
                data={borrows?.data || []}
                pagination
                highlightOnHover
                responsive
                dense
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                className="table"
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
            /> : (
                <div className='w-full flex justify-center'>
                    <LoadingAnimation />
                </div>
            )}
        </>
    );
}

export default AdminBorrow;
