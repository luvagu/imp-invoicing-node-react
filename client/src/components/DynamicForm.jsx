import { useState } from 'react'
import { ReactComponent as Logo } from '../assets/imp-logo.svg'
import ProductSearchModal from './ProductSearchModal'

import { initialDocInfo } from '../data/initialData'
import Download from '../pdf/Download'

export default function DynamicForm({ formTitle }) {
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    } 

    return (
        <div className="container mx-auto p-4">
            <div className="mx-auto py-6 px-4 bg-white">

                <div className="flex mb-8 justify-between">
                    <div className="flex items-center justify-start">
                        <Logo className="h-10 w-auto border border-yellow-200 rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold mr-4 pb-2 tracking-wider uppercase">{formTitle}</h2>

                        <div className="p-1 text-gray-500 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center">
                            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>			  
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between mb-8">
                    <div className="w-full md:w-1/2 mb-2 md:mb-0">
                        <h3 className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">IMPORPERNOS S.C.C.</h3>
                        <p className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight">
                            <span className="font-semibold">RUC: 1792673844001</span><br/>
                            Av. De La Prensa N44-72<br/>
                            Quito - Ecuador<br/>
                            Telf: 02-2430-658<br/>
                            Email: ventas@imporpernos.com
                        </p>
                    </div>

                    <div className="w-full md:w-1/3">
                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">{formTitle} No.</label>
                        <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight">AUTOGENERADO</div>

                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Fecha Emision</label>
                        <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight">2021-03-18</div>
                    </div>
                </div>

                <Download data={initialDocInfo} /> 
                
                <div className="flex justify-center mb-8">
                    <div className="flex flex-wrap w-full">
                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase w-full tracking-wide">Datos Cliente:</label>

                        <div className="flex flex-wrap w-full justify-between">
                            <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-1/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="RUC / CI / Pasaporte" />
                            <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Telefono" />
                            <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Correo" />
                            <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-2/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Nombre / Empresa" />
                            <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Direccion" />
                        </div>
                    </div>
                </div>

                <div className="flex -mx-1 border-b py-2 items-start">
                    <div className="flex-1 px-1">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Descripcion</p>
                    </div>

                    <div className="px-1 w-28 text-right">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Cantidad</p>
                    </div>

                    <div className="px-1 w-28 text-right">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">P.Unit</p>
                    </div>

                    <div className="px-1 w-28 text-right">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Dcto. %</p>
                    </div>

                    <div className="px-1 w-28 text-right">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">P.Total</p>
                    </div>

                    <div className="px-1 w-10"></div>
                </div>

                <div className="flex items-center -mx-1 py-2 border-b">
                    <div className="flex-1 px-1 w-32 lg:w-auto">
                        <span className="font-medium text-xs text-gray-500">1221616</span>
                        <p className="text-gray-800 truncate">sdfsdf 4465ds4fs df5464df sdfasd sdafds sdafsd</p>
                    </div>

                    <div className="px-1 w-28 text-right">
                        <p className="text-gray-800">50</p>
                    </div>

                    <div className="px-1 w-28 text-right">
                        <p className="text-gray-800">1.85</p>
                    </div>

                    <div className="px-1 w-28 text-right">
                        <p className="text-gray-800">10</p>
                    </div>

                    <div className="px-1 w-28 text-right">
                        <p className="text-gray-800">60.25</p>
                    </div>

                    <div className="px-1 w-10 text-right">
                        <button className="text-red-500 hover:text-red-600 text-sm">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                <button 
                    onClick={handleShowModal}
                    className="mt-6 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm mr-4">
                    Añadir Producto
                </button>

                <button className="mt-6 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm">
                    Producto Personalizado
                </button>

                <div className="py-2 ml-auto mt-5 w-full sm:w-2/4 xl:w-1/4">
                    <div className="flex justify-between mb-3">
                        <div className="text-gray-800 text-right flex-1">Subtotal</div>
                        <div className="text-right w-40">
                            <div className="text-gray-800 font-medium">5456.20</div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mb-4">
                        <div className="text-sm text-gray-600 text-right flex-1">Descuento</div>
                        <div className="text-right w-40">
                            <div className="text-sm text-gray-600">1212.15</div>
                        </div>
                    </div>

                    <div className="flex justify-between mb-4">
                        <div className="text-sm text-gray-600 text-right flex-1">Iva 12%</div>
                        <div className="text-right w-40">
                            <div className="text-sm text-gray-600">1212.15</div>
                        </div>
                    </div>
                
                    <div className="py-2 border-t border-b">
                        <div className="flex justify-between">
                            <div className="text-xl text-gray-600 text-right flex-1">Valor Total</div>
                            <div className="text-right w-40">
                                <div className="text-xl text-gray-800 font-bold">$54545.55</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <ProductSearchModal show={showModal} handleClose={handleCloseModal} />

            </div>
        </div>
    )
}

