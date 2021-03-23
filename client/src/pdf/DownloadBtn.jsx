import { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFDocument from './PDFDocument'

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
    <div className={`${!show ? 'opacity-30' : 'opacity-100'} p-1 text-white rounded-full bg-red-600 hover:bg-red-700 inline-flex items-center justify-center ml-2`} title="Descargar PDF">
        <PDFDownloadLink
          document={<PDFDocument data={data} />}
          fileName={`${data.docType ? `${data.docType.toLowerCase()}-${data.docNum}` : 'documento'}.pdf`}
          aria-label="Save PDF"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </PDFDownloadLink>
    </div>
  )
}