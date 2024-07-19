import React, { useState } from 'react'
import Skeleton from '../Components/Skeleton'
import Book from '../Components/Book'
import UseGet from '../Axios/UseGet'

function HomePage() {
    const [statusUser, setStatusUser] = useState(sessionStorage.getItem('status_user') || 0)
    const [trendingBooks] = UseGet('/trending')
    const [books] = UseGet('/buku')
    // console.log(trendingBooks);
    // console.log(books);

    const trendingBookIds = trendingBooks?.data?.map(book => book.idbuku) || [];
    console.log(trendingBookIds);

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
                            <button className="btn bg-transparent border-[#03A9F4] border-4 hover:bg-[#03A9F4] hover:border-[#03A9F4] hover:text-white group"><img src="bluemark.svg" alt="" className='w-9 mb-2' />Get Bluemark</button>
                        </div>
                    </div>
                </div>)
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
                        books?.data && trendingBooks?.data ? (
                            trendingBooks?.data?.map((book, index) => (
                                <Book key={book.idbuku} {...book} />
                            ))
                        ) : (
                            <><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /></>
                        )
                    }
                </div>
            </div>
            <div className="container justify-start bg-base-200 rounded-box p-4 m-4">
                <h1 className='text-2xl ml-8 my-2 row justify-start font-bold'>Books in your language 📚</h1>
                <div className="divider"></div>
                <div className="row my-4 flex justify-center">
                    {/* {
                        // filter books by language
                        books?.data && books?.data ? (
                            books?.data?.map((book, index) => (
                                <Book key={book.idbuku} {...book} />
                            ))
                        ) : ( */}
                            <><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /></>
                        {/* )
                    } */}
                </div>
            </div>
            <div className="container justify-start bg-base-200 rounded-box p-4 m-4">
                <h1 className='text-2xl ml-8 my-2 row justify-start font-bold'>Curator's Picks ✨</h1>
                <div className="divider"></div>
                <div className="row my-4 flex justify-center">
                    <Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton />
                </div>
            </div>
        </>
    )
}

export default HomePage