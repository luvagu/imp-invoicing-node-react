import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dataSearchApi } from '../api/helpers'

import ProformaInvoice from './ProformaInvoice'

export default function Test() {
    const [data, setdata] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { folder, doc } = useParams()

    useEffect(() => {
        // if (!folder || !doc) return

        let didCancel = false

        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await dataSearchApi(`get-doc/${folder}/${doc}`)
                if (!didCancel) setdata(data)
            } catch (error) {
                if (!didCancel) setErrorMsg(error.response.data.error)
            }
            setIsLoading(false)
        } 
        fetchData()
        
        return () => didCancel = true
    }, [folder, doc])

    return data ? <ProformaInvoice /> : <h1>{errorMsg}</h1>
}
