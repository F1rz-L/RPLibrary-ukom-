import React, { useEffect, useState } from 'react'
import Skeleton from '../Components/Skeleton'
import Book from '../Components/Book'
import UseGet from '../Axios/UseGet'
import { link } from '../Axios/link'
import { Link } from 'react-router-dom'

function HomePage() {
    const [statusUser, setStatusUser] = useState(sessionStorage.getItem('status_user') || 0)
    const [idUser, setIdUser] = useState(sessionStorage.getItem('iduser') || null);
    const [subscription, setSubscription] = useState(null)
    const [trendingBooks] = UseGet('/trending')
    // const [user, setUser] = useState('')

    const [books] = UseGet('/buku')
    const [user] = UseGet(`/user/${idUser}`)
    const sortedBooksByRating = [...(books?.data || [])].sort((a, b) => b.rating - a.rating).slice(0, 6);
    const sortedBooksByPrice = [...(books?.data || [])].sort((a, b) => a.harga - b.harga).slice(0, 6);

    console.log(user);

    // useEffect(() => {
    //     async function getUser() {
    //         if (idUser) {
    //             const userdata = await link.get(`/user/${idUser}`)
    //             setUser(userdata.data.data)
    //         }
    //     } 

    //     getUser()
    // }, [idUser])

    // console.log(user);

    function heroChecker() {
        if (statusUser == 1) {
            return (
                <div className="hero bg-base-200 border-l-8 justify-start border-[#03A9F4] p-4 m-4 rounded-box">
                    <div className="hero-content flex-col  lg:flex-row-reverse">
                        <div className=''>
                            <h1 className="text-5xl font-bold">Get Bluemark™ Now!</h1>
                            <p className="py-6">
                                Instead of buying individual books, borrow only what you want to read! Now for only {Number(120000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}/month
                            </p>
                            <Link to="/getbluemark" className="btn bg-transparent border-[#03A9F4] border-4 hover:bg-[#03A9F4] hover:border-[#03A9F4] hover:text-white group"><img src="bluemark.svg" alt="" className='w-9 mb-2' />Get Bluemark</Link>
                        </div>
                    </div>
                </div>
            )
        } else if (statusUser == 2) {
            const [subscription] = UseGet(`/checksubscription/${idUser}`);
            const [pinjaman] = UseGet(`/pinjam/${idUser}`);

            const [buku, setBuku] = useState(null);

            useEffect(() => {
                // Fetch book details only when pinjaman's idbuku is available
                if (pinjaman?.data?.idbuku) {
                    link.get(`/buku/${pinjaman?.data?.idbuku}`).then((response) => {
                        setBuku(response.data.data[0]);
                    });
                }
            }, [pinjaman]);

            const tglakhir = new Date(subscription?.data?.tglakhir);
            const tglsekarang = new Date();

            const timeDifferenceSubscription = tglakhir - tglsekarang;
            const remainingDaysSubscription = Math.ceil(timeDifferenceSubscription / (1000 * 60 * 60 * 24) - 1);
            const percentageRemainingSubscription = (remainingDaysSubscription / 30) * 100;
            const daysSubscription = Math.floor(timeDifferenceSubscription / (1000 * 60 * 60 * 24));

            // Assuming pinjaman has a `tglkembali` property (adjust accordingly)
            const tglkembali = new Date(pinjaman?.data?.tglkembali);
            const timeDifferencePinjaman = tglkembali - tglsekarang;

            const remainingDaysPinjaman = Math.ceil(timeDifferencePinjaman / (1000 * 60 * 60 * 24) - 1);
            const percentageRemainingPinjaman = (remainingDaysPinjaman / 7) * 100;
            const daysPinjaman = Math.floor(timeDifferencePinjaman / (1000 * 60 * 60 * 24));

            console.log(pinjaman);
            // console.log(buku); // This will log the book details if fetched correctly

            return (
                <div className="hero bg-base-200 justify-center p-2 m-4 rounded-box">
                    <div className="stats glass shadow w-full">
                        <div className="stat">
                            <div className="stat-title">Your Balance</div>
                            <div className="stat-value">
                                {Number(user?.data?.saldo).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                            </div>
                        </div>
                        {pinjaman && pinjaman?.data?.idbuku ? <div className="stat">
                            <div className="stat-title">Borrowed book</div>
                            <div className='bg-base-200 p-4 my-2 rounded-box flex'>
                                <img src={buku?.cover} className='w-20 rounded-box glass mr-2' alt="" />
                                <div>
                                    <p className='stat-value text-sm'>{buku?.judul || '...'}</p>
                                    <p className='stat-desc '>By {buku?.pengarang || '...'}</p>
                                </div>
                            </div>
                            {remainingDaysPinjaman < 0 ?
                                <div className="stat-desc">You're late for {-remainingDaysPinjaman} day(s). Return immediately</div>
                                :
                                <div className="stat-desc">Return in {remainingDaysPinjaman} days</div>
                            }
                            <div className="stat-value flex justify-center mt-1">
                                {remainingDaysPinjaman < 0 ?
                                    <progress className="progress w-56 progress-error" value={100} max="100"></progress>
                                    :
                                    <progress className="progress w-56" value={percentageRemainingPinjaman} max="100"></progress>
                                }
                            </div>
                        </div>
                            :
                            <div className="stat">
                                <div className="stat-title">Borrowed Book</div>
                                <div className="stat-desc opacity-80">You are not borrowing any book</div>
                            </div>
                        }
                        <div className="stat">
                            <div className="stat-desc">Your subscription ends in..</div>
                            <div className="stat-value flex justify-center my-2">
                                <div
                                    className="radial-progress bg-base-300 text-sm border-base-300 border-4"
                                    style={{ "--value": percentageRemainingSubscription }}
                                    role="progressbar">
                                    <span className="countdown font-mono text-lg">
                                        <span style={{ "--value": daysSubscription }}></span>d
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            <div className="row">
                <h1 className='text-5xl ml-8 mb-4 row justify-start font-extrabold'>Home Page</h1>
            </div>
            {heroChecker()}
            <div className="container justify-start bg-base-200 rounded-box p-4 m-4">
                <h1 className='text-2xl ml-8 my-2 row justify-start font-bold'>Trending Books 📖</h1>
                <div className="divider"></div>
                <div className="row my-4 flex justify-center">
                    {
                        idUser ? (
                            books?.data && trendingBooks?.data && user?.data ? (
                                trendingBooks.data.map((book) => (
                                    <Book key={book.idbuku} idUser={user.data.id} idBukuPinjam={user.data.idbukupinjam} {...book} />
                                ))
                            ) : (
                                <><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /></>
                            )
                        ) : (
                            books?.data && trendingBooks?.data ? (
                                trendingBooks.data.map((book) => (
                                    <Book key={book.idbuku} {...book} />
                                ))
                            ) : (
                                <><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /></>
                            )
                        )
                    }
                </div>
            </div>
            <div className="container justify-start bg-base-200 rounded-box p-4 m-4">
                <h1 className='text-2xl ml-8 my-2 row justify-start font-bold'>Highly Rated ✨</h1>
                <div className="divider"></div>
                <div className="row my-4 flex justify-center">
                    {
                        idUser ? (
                            books?.data && user?.data ? (
                                sortedBooksByRating?.map((book) => (
                                    <Book key={book.idbuku} idUser={user.data.id} idBukuPinjam={user.data.idbukupinjam} {...book} />
                                ))
                            ) : (
                                <><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /></>
                            )
                        ) : (
                            books?.data ? (
                                sortedBooksByRating?.map((book) => (
                                    <Book key={book.idbuku} {...book} />
                                ))
                            ) : (
                                <><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /></>
                            )
                        )
                    }
                </div>
            </div>
            <div className="container justify-start bg-base-200 rounded-box p-4 m-4">
                <h1 className='text-2xl ml-8 my-2 row justify-start font-bold'>Affordable Read 💸</h1>
                <div className="divider"></div>
                <div className="row my-4 flex justify-center">
                    {
                        idUser ? (
                            books?.data && user?.data ? (
                                sortedBooksByPrice?.map((book) => (
                                    <Book key={book.idbuku} idUser={user.data.id} idBukuPinjam={user.data.idbukupinjam} {...book} />
                                ))
                            ) : (
                                <><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /></>
                            )
                        ) : (
                            books?.data ? (
                                sortedBooksByPrice?.map((book) => (
                                    <Book key={book.idbuku} {...book} />
                                ))
                            ) : (
                                <><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /></>
                            )
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default HomePage