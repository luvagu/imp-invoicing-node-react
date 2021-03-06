import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import useGetApi from '../hooks/useGetApi'

import ProformaInvoice from './ProformaInvoice'

export default function DocumentView() {
	const { folder, doc } = useParams()

	const [{ searchResults: docData, isLoading, errorMsg }, setRouteWithQuery] = useGetApi()

	useEffect(() => {
		setRouteWithQuery(`/get-doc/${folder}/${doc}`)
	}, [folder, doc, setRouteWithQuery])

	return docData ? (
		<ProformaInvoice
			docType={docData.docType}
			apiFolder={folder}
			docDataReceived={docData}
			allowNotes={folder === 'proformas' ? true : false}
		/>
	) : (
		<div className="container sm:sm-mw md:md-mw lg:lg-mw mx-auto px-4 md:px-6 py-4 md:py-6">
			{isLoading && (
				<div className="mt-8 px-4 text-center">
					<Spinner />
				</div>
			)}
			{errorMsg && (
				<div className="mt-8 px-4 text-center text-sm text-red-600 font-semibold uppercase">
					{errorMsg}
				</div>
			)}
		</div>
	)
}
