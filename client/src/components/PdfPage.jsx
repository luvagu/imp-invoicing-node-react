import { Page as PdfPage } from '@react-pdf/renderer'
import compose from '../styles/compose'

export default function Page({ className, pdfMode, children }) {
  return (
    <>
      {pdfMode ? (
        <PdfPage size="A4" style={compose('page ' + (className ? className : ''))}>
          {children}
        </PdfPage>
      ) : (
        <div className={'page ' + (className ? className : '')}>{children}</div>
      )}
    </>
  )
}
