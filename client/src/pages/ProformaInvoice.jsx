import { useEffect, useState } from 'react'
import { Prompt } from 'react-router-dom'
import { createDocApi, updateDocApi } from '../api/helpers'

import { ReactComponent as Logo } from '../assets/imp-logo.svg'
import { SvgTrash } from '../icons'

import { initialDocInfo, paymentMethods } from '../data/initialData'

import DocActionsBtn from '../components/DocActionsBtn'
import DownloadBtn from '../pdf/DownloadBtn'
import Input from '../components/Input'

import Modal from '../components/Modal'
import ModalClientAdd from '../components/ModalClientAdd'
import ModalClientSearch from '../components/ModalClientSearch'
import ModalProductSearch from '../components/ModalProductSearch'
import Spinner from '../components/Spinner'
import BlockEditingLayer from '../components/BlockEditingLayer'
import Textarea from '../components/Textarea'

export default function ProformaInvoice({ docType, apiFolder, docDataReceived = null, allowNotes = false, user = 'Supervisor' }) {
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDocSaved, setIsDocSaved] = useState(false)
    const [isDocUpdating, setIsDocUpdating] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalVersion, setModalVersion] = useState('')
    const [docData, setDocData] = useState(docDataReceived ? { ...docDataReceived } : { ...initialDocInfo, docTs: Date.now(), docType, docDate: new Date().toLocaleString('es-EC'), user })

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

    const updateDocTotals = (productsList) => {
        const subTotal = productsList.reduce((acc, { total }) => (acc += parseFloat(total)), 0)
        const docSubtotal = formatTotals(subTotal)

        const discountTotal = productsList.reduce((acc, { quantity, price, discountRate }) =>(acc += (parseFloat(price) * parseFloat(quantity) * parseFloat(discountRate)) / 100), 0)
        const docDiscount = formatTotals(discountTotal)

        const taxAmount = subTotal * (parseFloat(docData.docTaxRate) / 100)
        const docTaxAmount = formatTotals(taxAmount)

        const docTotal = formatTotals(subTotal + taxAmount)

        return { docSubtotal, docDiscount, docTaxAmount, docTotal }
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

        // Update totals
        const newDocTotals = updateDocTotals(productsList)
        setDocData({ ...docData, productsList, ...newDocTotals })
    }

    const handleRemoveProduct = (productIdx) => {
        const productsList = docData.productsList.filter((_, idx) => idx !== productIdx)

        // Update totals
        const newDocTotals = updateDocTotals(productsList)
        setDocData({ ...docData, productsList, ...newDocTotals })
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

        // Update totals
        const newDocTotals = updateDocTotals(productsList)
		setDocData({ ...docData, productsList, ...newDocTotals })
	}

    const handleChange = (name, value) => {
        if (name === 'productsList' || name === 'clientData') return

        const newDocData = { ...docData }
        newDocData[name] = value
        setDocData(newDocData)
    }

    const checkDocumentRequiredFields = () => {
        // Client fields
        const id = docData.clientData.id.trim().length > 0 && docData.clientData.id.trim().length <= 13
        const name = docData.clientData.name.trim().length > 3
        const address = docData.clientData.address.trim().length > 3
        const email = docData.clientData.email.trim().length >= 6 && /^([\w_\-.]+)@([\w\-.]+)$/.test(docData.clientData.email.trim())
        const phone = docData.clientData.phone.trim().length >= 7

        // Payment method and products
        const paymentMethod = paymentMethods.indexOf(docData.docPaymentMethod) > -1
        const hasAtLeastOneProduct = docData.productsList.length > 0

        if (id && name && address && email && phone && paymentMethod && hasAtLeastOneProduct) {
            return true
        } else {
            if (!id || !name || !address || !email || !phone) {
                setErrorMsg('Datos Cliente incompletos o inavalidos')
            }
            if (!paymentMethod) {
                setErrorMsg('Debes seleccionar la forma de pago')
            }
            if (!hasAtLeastOneProduct) {
                setErrorMsg('Debes añadir al menos un producto')
            }
            return false
        }
    }

    const handleSave = async () => {
        if (!checkDocumentRequiredFields() || isDocSaved) return

        setIsLoading(true)

        try {
            const response = await createDocApi(apiFolder, docData)
            const { docNum } = response
            setDocData({ ...docData, docNum })
            setIsDocSaved(true)
            setIsEditing(false)
            setSuccessMsg(response.message)
        } catch (error) {
            setIsDocSaved(false)
            setErrorMsg(error.response?.data.error || 'Network Error')
            console.log(error.response?.data.error)
        }

        setIsLoading(false)
    }

    const handleEdit = () => {
        setIsDocUpdating(true)
        setIsEditing(true)
    }

    const handleUpdate = async () => {
        if (!checkDocumentRequiredFields()) return

        setIsLoading(true)

        try {
            const response = await updateDocApi(apiFolder, docData.docNum, docData)
            setIsDocUpdating(false)
            setIsEditing(false)
            setSuccessMsg(response.message)
        } catch (error) {
            setIsDocUpdating(true)
            setErrorMsg(error.response?.data.error || 'Network Error')
            console.log(error.response?.data.error)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        if (!docData.productsList.length) {
            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
        
    }, [docData.productsList])

    useEffect(() => {
        if (!errorMsg) return
    
        const timeout = setTimeout(() => {
            setErrorMsg('')
        }, 5000)
    
        return () => clearTimeout(timeout)
    }, [errorMsg])

    useEffect(() => {
        if (!successMsg) return
    
        const timeout = setTimeout(() => {
            setSuccessMsg('')
        }, 5000)
    
        return () => clearTimeout(timeout)
    }, [successMsg])

    useEffect(() => {
        if (docDataReceived === null) return
        setIsDocSaved(true)
        setIsEditing(false)
    }, [docDataReceived])

    return (
        <div className="container sm:sm-mw md:md-mw lg:lg-mw mx-auto px-4 md:px-6 py-4 md:py-6">
            {/* Promt the user in case of unsaved data */}
            <Prompt
                when={isEditing}
                message={location => `Documento sin gravar, seguro que quieres ir a (${location.pathname})?`}
            />

            {/* Page header and action buttons */}
            <div className="flex justify-between mb-6">
                <div className="flex items-center justify-start">
                    <Logo className="h-7 sm:h-10 w-auto border border-yellow-200 rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-xl lg:text-2xl font-bold tracking-wider uppercase">{docData.docType}</h2>

                    {!isDocSaved && !isLoading && <DocActionsBtn action='save' handle={handleSave} title='Guardar' />}
                    {isDocUpdating && isDocSaved && !isLoading && <DocActionsBtn action='update' handle={handleUpdate} title='Actualizar' bgcolor='bg-blue-600' bghover='bg-blue-800' />}
                    {(isDocSaved && !isDocUpdating) && !isLoading && (
                        <>
                            {!docDataReceived && <DocActionsBtn action='link' title={`Nuevo Documento ${docType}`} />}
                            <DocActionsBtn action='edit' handle={handleEdit} title='Editar' bgcolor='bg-yellow-600' bghover='bg-yellow-800' />
                            <DownloadBtn data={{ ...docData }} />
                        </>
                    )}
                    {isLoading && <Spinner /> }
                </div>
            </div>

            {errorMsg && <div className="mb-6 p-1 text-sm text-center text-red-600 font-semibold uppercase rounded shadow-sm bg-red-200">{errorMsg}</div>}
            {successMsg && <div className="mb-6 p-1 text-sm text-center text-green-700 font-semibold uppercase rounded shadow-sm bg-green-200">{successMsg}</div>}

            <BlockEditingLayer isDocSaved={isDocSaved} isDocUpdating={isDocUpdating}>
                {/* Client details and doc info */}
                <div className="flex flex-wrap justify-between mb-6">
                    <div className="w-full md:w-1/2 mb-1 md:mb-0">
                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">{docData.companyName}</label>
                        <div className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700">
                            <label className="text-gray-800 block mb-2 font-bold text-sm uppercase">{docData.clientDetailsLabel}</label>
                            {docData.clientData.id && (
                                <p className="block text-sm mb-2 break-words">
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
                            value={docData.docPaymentMethod}
                        >
                            <option>-</option>
                            {paymentMethods && paymentMethods.length > 0 && paymentMethods.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {/* Products list header */}
                <div className="flex items-start -mx-1 py-2 border-b">
                    <div className="px-1 w-32 sm:w-1/2 tracking-wide">
                        <p className="text-gray-800 uppercase text-sm font-bold">Descripcion</p>
                    </div>

                    <div className="px-1 w-32 text-right tracking-wide">
                        <p className="text-gray-800 uppercase text-sm font-bold">Cantidad</p>
                    </div>

                    <div className="px-1 w-32 text-right tracking-wide hidden md:block">
                        <p className="text-gray-800 uppercase text-sm font-bold">P.Unit</p>
                    </div>

                    <div className="px-1 w-32 text-right tracking-wide hidden lg:block">
                        <p className="text-gray-800 uppercase text-sm font-bold">Dcto. %</p>
                    </div>

                    <div className="px-1 w-32 text-right tracking-wide">
                        <p className="text-gray-800 uppercase text-sm font-bold">P.Total</p>
                    </div>

                    <div className="px-1 w-10"> </div>
                </div>

                {/* Products list */}
                {docData.productsList && docData.productsList.length > 0 && docData.productsList.map((product, idx) => (
                    <div key={idx} className="flex items-end -mx-1 py-2 border-b">
                        <div className="px-1 w-32 sm:w-1/2">
                            <span className="font-medium text-sm text-gray-500">{product.id}</span>
                            <Input extraClass='py-1 px-2 text-sm' name='name' value={product.name} placeholder='Nombre' onChange={(e) => handleChangeProduct(idx, 'name', e.target.value)} />
                        </div>

                        <div className="px-1 w-32">
                            <Input extraClass='py-1 px-2 text-right text-sm' name='quantity' value={product.quantity} placeholder='Cantidad' onChange={(e) => handleChangeProduct(idx, 'quantity', e.target.value)} />
                        </div>

                        <div className="px-1 w-32 hidden md:block">
                            <Input extraClass='py-1 px-2 text-right text-sm' name='price' value={product.price} placeholder='Precio' onChange={(e) => handleChangeProduct(idx, 'price', e.target.value)} />
                        </div>

                        <div className="px-1 w-32 hidden lg:block">
                            <Input extraClass='py-1 px-2 text-right text-sm' name='discountRate' value={product.discountRate} placeholder='Descuento' onChange={(e) => handleChangeProduct(idx, 'discountRate', e.target.value)} />
                        </div>

                        <div className="px-1 w-32 text-right">
                            <Input extraClass='py-1 px-2 text-right text-sm' name='total' value={product.total} placeholder='Total' onChange={(e) => handleChangeProduct(idx, 'total', e.target.value)} disabled={true} />
                        </div>

                        <div className="px-1 w-10 text-right">
                            <button 
                                onClick={() => handleRemoveProduct(idx)}
                                className="text-red-500 hover:text-red-700 text-sm"
                                type="button"
                                title="Eliminar fila"
                            >
                                <SvgTrash className="w-5 h-5" />
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
                                    <div className="text-xl text-gray-800 font-bold">{docData.currencySymbol} {docData.docTotal}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doc notes */}
                {allowNotes && (
                    <div className="flex flex-wrap mt-6">
                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">{docData.notesLabel}</label>
                        <Textarea 
                            value={docData.docNotes} 
                            placeholder='Ingresa aqui las condiciones de pago y tiempo de entrega'
                            onChange={(e) => handleChange('docNotes', e.target.value)}
                        />
                    </div>
                )}

                {/* User */}
                <div className="flex flex-wrap mt-6">
                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">{docData.userLabel} {docData.user}</label>
                </div>
            </BlockEditingLayer>

            {/* Modals */}
            <Modal showModal={showModal} closeModal={handleCloseModal}>
                {modalVersion === 'client-add' && <ModalClientAdd closeModal={handleCloseModal} handleAddClient={handleAddClient} data={docData.clientData.id ? { ...docData.clientData } : null} />}
                {modalVersion === 'client-search' && <ModalClientSearch closeModal={handleCloseModal} handleAddClient={handleAddClient} />}
                {modalVersion === 'products' && <ModalProductSearch closeModal={handleCloseModal} handleAddProduct={handleAddProduct} />}
            </Modal>
        </div>
    )
}
