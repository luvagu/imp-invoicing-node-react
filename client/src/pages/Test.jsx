import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import useSearchApi from '../hooks/useSearchApi'

import ProformaInvoice from './ProformaInvoice'

export default function Test() {
    const { folder, doc } = useParams()

    const [{ searchResults: docData, isLoading, errorMsg }, setRouteWithQuery] = useSearchApi()

    useEffect(() => {
        setRouteWithQuery(`get-doc/${folder}/${doc}`)
    })

    // useEffect(() => {
    //     // if (!folder || !doc) return

    //     let didCancel = false

    //     const fetchData = async () => {
    //         setIsLoading(true)
    //         try {
    //             const data = await dataSearchApi(`get-doc/${folder}/${doc}`)
    //             if (!didCancel) setDocData(data)
    //         } catch (error) {
    //             if (!didCancel) setErrorMsg(error.response?.data.error || 'Network Error')
    //         }
    //         setIsLoading(false)
    //     } 
    //     fetchData()
        
    //     return () => didCancel = true
    // }, [folder, doc])

    return docData ? <ProformaInvoice docType={docData.docType} apiFolder={folder} docDataReceived={docData}  /> : (
        <>
            {isLoading && <div className="mt-8 px-4 text-center"><Spinner /></div>}
            {errorMsg && <div className="mt-8 px-4 text-center text-sm text-red-600 font-semibold uppercase">{errorMsg}</div>}
        </>
    )
}
