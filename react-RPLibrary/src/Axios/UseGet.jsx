import React, { useEffect } from 'react'
import { link } from './link'

function UseGet(url) {
    const [isi, setIsi] = React.useState([])

    useEffect(() => {

        async function fetchData(){
            const result = await link.get(url)
            setIsi(result.data)
        }
        fetchData()
    }, [])

    return [isi];
}

export default UseGet