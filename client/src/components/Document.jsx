import { Document as PdfDocument } from '@react-pdf/renderer'

export default function Document({ pdfMode, children }) {
  return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : {children}}</>
}
