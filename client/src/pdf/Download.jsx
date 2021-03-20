import { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFDocument from './PDFDocument'

export default function DownloadPdf({ data }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(false)

    const timeout = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => clearTimeout(timeout)
  }, [data])

  return (
    <div className={'download-pdf ' + (!show ? 'loading' : '')} title="Descargar PDF">
      {show && (
        <PDFDownloadLink
          document={<PDFDocument data={data} />}
          fileName={`${data.docTypeTitle ? `${data.docTypeTitle.toLowerCase()}-${data.docNum}` : 'factura'}.pdf`}
          aria-label="Save PDF"
        >down</PDFDownloadLink>
      )}
      
    </div>
  )
}