import { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFDocument from './PDFDocument'

import { SvgDocDownload } from '../icons'

export default function DownloadBtn({ data }) {
	const [show, setShow] = useState(false)

	useEffect(() => {
		if (!data) return

		setShow(false)

		const timeout = setTimeout(() => {
			setShow(true)
		}, 500)

		return () => clearTimeout(timeout)
	}, [data])

	return (
		<div
			className={`${
				!show ? 'opacity-30' : 'opacity-100'
			} p-1 text-white rounded-full bg-red-600 hover:bg-red-700 inline-flex items-center justify-center ml-2`}
      title="Descargar PDF"
		>
			<PDFDownloadLink
				document={<PDFDocument data={data} />}
				fileName={`${data.docType ? `${data.docType}-${data.docNum}` : 'documento'}.pdf`}
				aria-label="Descargar PDF"
			>
				<SvgDocDownload className="w-5 h-5" />
			</PDFDownloadLink>
		</div>
	)
}
