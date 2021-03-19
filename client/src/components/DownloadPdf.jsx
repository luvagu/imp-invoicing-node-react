import { useEffect, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DinamicForm from './DynamicForm'

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
          document={<DinamicForm pdfMode={true} data={data} />}
          fileName={`${data.invoiceTitle ? data.invoiceTitle.toLowerCase() : 'factura'}.pdf`}
          aria-label="Save PDF"
        ></PDFDownloadLink>
      )}
    </div>
  )
}