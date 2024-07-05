import React, { useEffect, useState } from 'react'
import { link } from './link'

function UseGet(url) {
    const [isi, setIsi] = useState([])

    useEffect(() => {
        async function fetchData() {
        /**
         * Function to fetch data asynchronously.
         */
            const result = await link.get(url)
            setIsi(result.data)
        }
        fetchData()
    }, [])

    return [isi];
}

export default UseGet