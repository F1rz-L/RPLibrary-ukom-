import React from 'react'
import Skeleton from '../Components/Skeleton'
import Book from '../Components/Book'

function HomePage() {
    return (
        <>
            <div className="row">
                <h1 className='text-5xl ml-8 mb-4 row justify-start font-extrabold'>Home Page</h1>
            </div>
            <div className="container justify-start bg-base-200 rounded-box p-4 mb-4">
                <h1 className='text-2xl ml-8 my-2 row justify-start font-bold'>Continue Reading 📖</h1>
                <div className="divider"></div>
                <div className="row my-4 flex justify-center">
                    <Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton />
                </div>
            </div>
            <div className="container justify-start bg-base-200 rounded-box p-4 mb-4">
                <h1 className='text-2xl ml-8 my-2 row justify-start font-bold'>Book with genre you might like ✔️</h1>
                <div className="divider"></div>
                <div className="row my-4 flex justify-center">
                    <Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton /><Skeleton />
                </div>
            </div>
            <div className="container justify-start bg-base-200 rounded-box p-4 mb-4">
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