import { useParams } from 'react-router-dom'
import ProformaInvoice from './ProformaInvoice'

export default function Test() {
    const { type, num } = useParams()
    console.log(type, num)
    return num === '40060' ? <ProformaInvoice /> : <h1>Not allowed</h1>
}
