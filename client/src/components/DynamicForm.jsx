import { useState } from 'react'
import { ReactComponent as Logo } from '../assets/imp-logo.svg'
import ProductSearchModal from './ProductSearchModal'



export default function DynamicForm({ title }) {
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    } 

    return (
        <div>
            <button onClick={handleShowModal}>📂</button>
            <ProductSearchModal show={showModal} handleClose={handleCloseModal} />
        </div>
    )
}

