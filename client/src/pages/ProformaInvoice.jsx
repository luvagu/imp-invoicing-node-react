import { useEffect, useState } from 'react'
import { Prompt } from 'react-router-dom'
import { createDocApi } from '../api/helpers'

import { ReactComponent as Logo } from '../assets/imp-logo.svg'

import { initialDocInfo, paymentMethods } from '../data/initialData'

import SaveDocIcon from '../components/SaveDocBtn'
import DownloadBtn from '../pdf/DownloadBtn'

import Modal from '../components/Modal'
import ClientAddModal from '../components/ClientAddModal'
import ClientSearchModal from '../components/ClientSearchModal'
import ProductSearchModal from '../components/ProductSearchModal'
import Spinner from '../components/Spinner'

export default function ProformaInvoice({ docType, apiFolder }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDocChecked, setIsDocChecked] = useState(false)
    const [isDocSaved, setIsDocSaved] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalVersion, setModalVersion] = useState('')
    const [docData, setDocData] = useState({ ...initialDocInfo, docType, docDate: new Date().toLocaleString('es-EC') })

    const docTaxRate = initialDocInfo.docTaxRate

    const handleShowModal = (version) => {
        setShowModal(true)
        setModalVersion(version)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setModalVersion('')
    }

    const handleAddClient = (client) => {
        const clientData = { ...client }
        setDocData({ ...docData, clientData })
    }

    const formatProductPrice = (price) => parseFloat(price).toFixed(4)

    const formatTotals = (price) => parseFloat(price).toFixed(2)

    const calculateProductTotal = (price, quantity, discountRate) => {
        const priceNumber = parseFloat(price)
        const quantityNumber = parseFloat(quantity)
        const discountRateNumber = parseFloat(discountRate)

        const discountAmount = priceNumber && quantityNumber && discountRateNumber ? ((priceNumber * quantityNumber) * discountRateNumber) / 100 : 0

        const productTotal = priceNumber && quantityNumber ? (priceNumber * quantityNumber) - discountAmount : 0

        return productTotal.toFixed(2)
    }

    const updateDocTotals = () => {
        const subTotal = docData.productsList.reduce((acc, { total }) => (acc += parseFloat(total)), 0)
        const docSubtotal = formatTotals(subTotal)

        const discountTotal = docData.productsList.reduce((acc, { quantity, price, discountRate }) =>(acc += (parseFloat(price) * parseFloat(quantity) * parseFloat(discountRate)) / 100), 0)
        const docDiscount = formatTotals(discountTotal)

        const taxAmount = subTotal * (parseFloat(docTaxRate) / 100)
        const docTaxAmount = formatTotals(taxAmount)

        const docTotal = formatTotals(subTotal + taxAmount)

        setDocData(docData => ({ ...docData, docSubtotal, docDiscount, docTaxAmount, docTotal }))
        setIsEditing(() => docData.productsList.length > 0)
    }

    const handleAddProduct = (product) => {
        const productToAdd = {
            id: product.id,
            name: product.name,
            quantity: '1',
            price: formatProductPrice(product.price),
            discountRate: '0',
            total: formatTotals(product.price)
        }

        const productsList = [ ...docData.productsList, productToAdd ]
        setDocData({ ...docData, productsList })
    }

    const handleRemoveProduct = (productIdx) => {
        const productsList = docData.productsList.filter((product, idx) => idx !== productIdx)
        setDocData({ ...docData, productsList })
    }

    const handleChangeProduct = (idx, keyName, value) => {
		const productsList = docData.productsList.map((product, i) => {
			if (i === idx) {
				const newProduct = { ...product }

				if (keyName === 'name') {
					newProduct[keyName] = value
				} else {
					if (
						value[value.length - 1] === '.' ||
						(value[value.length - 1] === '0' && value.includes('.'))
					) {
						newProduct[keyName] = value
					} else {
						const n = parseFloat(value)

						newProduct[keyName] = (n ? n : 0).toString()
					}
				}

				// Calculate product total
                newProduct.total = calculateProductTotal(newProduct.price, newProduct.quantity, newProduct.discountRate)

				return newProduct
			}

			return { ...product }
		})

		setDocData({ ...docData, productsList })
	}

    const handleChange = (name, value) => {
        if (name === 'productsList') return

        const newDocData = { ...docData }
        newDocData[name] = value
        setDocData(newDocData)
    }

    const handleSave = () => {
        setIsDocChecked(true)
        setIsLoading(true)
    }

    useEffect(updateDocTotals, [docData.productsList, docTaxRate])

    useEffect(() => {
        if (isDocChecked === false) return
    
        createDocApi(apiFolder, docData)
            .then(res => {
                setIsDocChecked(false)
                setIsLoading(false)
                setIsDocSaved(true)
                console.log(res)
            })
            .catch(err => {
                setIsDocChecked(false)
                setIsLoading(false)
                setIsDocSaved(false)
                console.log(err)
            })
            
    }, [isDocChecked])

    return (
        <div className="container mx-auto px-6 py-6">
            {/* Promt the user in case of unsaved data */}
            <Prompt
                when={isEditing}
                message={location => `Documento sin gravar, seguro que quieres ir a (${location.pathname})?`}
            />

            {/* Page header and save/print buttons */}
            <div className="flex justify-between mb-8">
                <div className="flex items-center justify-start">
                    <Logo className="h-10 w-auto border border-yellow-200 rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold mr-4 tracking-wider uppercase">{docData.docType}</h2>

                    {!isDocSaved && !isLoading && <SaveDocIcon handle={handleSave} />}
                    {isDocSaved && !isLoading && <DownloadBtn data={initialDocInfo} />}
                    {isLoading && <Spinner /> }
                </div>
            </div>

            {/* Client details and doc info */}
            <div className="flex flex-wrap justify-between mb-8">
                <div className="w-full md:w-1/2 mb-1 md:mb-0">
                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">{docData.companyName}</label>
                    <div className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700">
                        <label className="text-gray-800 block mb-2 font-bold text-sm uppercase">{docData.clientDetailsLabel}</label>
                        {docData.clientData.id && (
                            <p className="block text-sm mb-2">
                                {docData.clientIdLabel} {docData.clientData.id || ''}<br/>
                                {docData.clientData.name || ''}<br/>
                                {docData.clientData.address || ''}<br/>
                                {docData.clientData.phone || ''}<br/>
                                {docData.clientData.email || ''}
                            </p>
                        )}
                        <div className="inline-flex">
                            <button 
                                onClick={() => handleShowModal('client-add')}
                                className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm">
                                {docData.clientData.id ? 'Modificar' : 'Añadir'}
                            </button>

                            <button 
                                onClick={() => handleShowModal('client-search')}
                                className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm ml-2">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3">
                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">{docData.docType} No.</label>
                    <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700">{docData.docNum || 'Autogenerado'}</div>

                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">{docData.docDateLabel}</label>
                    <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700">{docData.docDate}</div>

                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">{docData.paymentMethodLabel}</label>
                    <select 
                        className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
                        onChange={(e) => handleChange('docPaymentMethod', e.target.value)}
                    >
                        {paymentMethods && paymentMethods.length > 0 && paymentMethods.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            {/* Products list header */}
            <div className="flex items-start -mx-1 py-2 border-b">
                <div className="px-1 w-1/2">
                    <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Descripcion</p>
                </div>

                <div className="px-1 w-32 text-right">
                    <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Cantidad</p>
                </div>

                <div className="px-1 w-32 text-right">
                    <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">P.Unit</p>
                </div>

                <div className="px-1 w-32 text-right">
                    <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Dcto. %</p>
                </div>

                <div className="px-1 w-32 text-right">
                    <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">P.Total</p>
                </div>

                <div className="px-1 w-10"> </div>
            </div>

            {/* Products list */}
            {docData.productsList && docData.productsList.length > 0 && docData.productsList.map((product, idx) => (
                <div key={idx} className="flex items-end -mx-1 py-2 border-b">
                    <div className="px-1 w-1/2">
                        <span className="font-medium text-sm text-gray-500">{product.id}</span>
                        {/* <p className="text-gray-800 truncate">sdfsdf 4465ds4fs df5464df sdfasd sdafds sdafsd</p> */}
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={product.name} placeholder="Nombre" onChange={(e) => handleChangeProduct(idx, 'name', e.target.value)} />
                    </div>

                    <div className="px-1 w-32">
                        {/* <p className="text-gray-800">50</p> */}
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-right text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={product.quantity} placeholder="Cantidad" onChange={(e) => handleChangeProduct(idx, 'quantity', e.target.value)} />
                    </div>

                    <div className="px-1 w-32">
                        {/* <p className="text-gray-800">1.85</p> */}
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-right text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={product.price} placeholder="Precio" onChange={(e) => handleChangeProduct(idx, 'price', e.target.value)} />
                    </div>

                    <div className="px-1 w-32">
                        {/* <p className="text-gray-800">10</p> */}
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-right text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500" type="text" value={product.discountRate} placeholder="Descuento" onChange={(e) => handleChangeProduct(idx, 'discountRate', e.target.value)} />
                    </div>

                    <div className="px-1 w-32 text-right">
                        {/* <p className="text-gray-800">60.25</p> */}
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-2 text-right text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500 placeholder-gray-900" type="text" placeholder={product.total} disabled />
                    </div>

                    <div className="px-1 w-10 text-right">
                        <button 
                            onClick={() => handleRemoveProduct(idx)}
                            className="text-red-500 hover:text-red-600 text-sm"
                            type="button"
                        >
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
            
            {/* Add product button and totals */}
            <div className="flex flex-wrap justify-between mt-6">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <button 
                        onClick={() => handleShowModal('products')}
                        className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm">
                        Añadir Producto
                    </button>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/2">
                    <div className="flex justify-between mb-3">
                        <div className="text-gray-800 text-right flex-1">{docData.subTotalLabel}</div>
                        <div className="text-right w-40">
                            <div className="text-gray-800 font-medium">{docData.docSubtotal}</div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mb-4">
                        <div className="text-sm text-gray-600 text-right flex-1">{docData.discountLabel}</div>
                        <div className="text-right w-40">
                            <div className="text-sm text-gray-600">{docData.docDiscount}</div>
                        </div>
                    </div>

                    <div className="flex justify-between mb-4">
                        <div className="text-sm text-gray-600 text-right flex-1">{docData.taxLabel}</div>
                        <div className="text-right w-40">
                            <div className="text-sm text-gray-600">{docData.docTaxAmount}</div>
                        </div>
                    </div>
                
                    <div className="py-2 border-t border-b">
                        <div className="flex justify-between">
                            <div className="text-xl text-gray-600 text-right flex-1">{docData.totalLabel}</div>
                            <div className="text-right w-40">
                                <div className="text-xl text-gray-800 font-bold">{docData.currency} {docData.docTotal}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            {/* Modals */}
            <Modal show={showModal}>
                {modalVersion === 'client-add' && <ClientAddModal 
                    handleClose={handleCloseModal} 
                    handleAddClient={handleAddClient}
                    data={docData.clientData.id ? { ...docData.clientData } : null}
                 />}
                {modalVersion === 'client-search' && <ClientSearchModal handleClose={handleCloseModal} handleAddClient={handleAddClient} />}
                {modalVersion === 'products' && <ProductSearchModal handleClose={handleCloseModal} handleAddProduct={handleAddProduct} />}
            </Modal>
        </div>
    )
}
