import { useState } from 'react'
import { ReactComponent as Logo } from '../assets/imp-logo.svg'
import ProductSearchModal from './ProductSearchModal'

import { initialDocInfo } from '../data/initialData'
import SaveDocIcon from './SaveDocBtn'
import DownloadBtn from '../pdf/DownloadBtn'

export default function DynamicForm({ formTitle }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isDocSaved, setIsDocSaved] = useState(false)
    const [docData, setDocData] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    } 

    return (
        <div className="container">
            <div className="py-6 px-5">

                <div className="flex mb-8 justify-between">
                    <div className="flex items-center justify-start">
                        <Logo className="h-10 w-auto border border-yellow-200 rounded" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold mr-4 tracking-wider uppercase">{formTitle}</h2>

                        {!isDocSaved ? (<SaveDocIcon isLoading={isLoading} />) : (<DownloadBtn data={initialDocInfo} />)}
                    </div>
                </div>

                <div className="flex flex-wrap justify-between mb-8">
                    <div className="w-full md:w-1/2 mb-2 md:mb-0">
                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">IMPORPERNOS S.C.C.</label>
                        <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight">
                            <span className="font-semibold">RUC: 1792673844001</span><br/>
                            Av. De La Prensa N44-72<br/>
                            Quito - Ecuador<br/>
                            Telf: 02-2430-658<br/>
                            Email: ventas@imporpernos.com
                        </div>

                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Datos Cliente:</label>
                        <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight">
                            <span className="font-semibold">RUC: 1792673844001</span><br/>
                            Av. De La Prensa N44-72<br/>
                            Quito - Ecuador<br/>
                            Telf: 02-2430-658<br/>
                            Email: ventas@imporpernos.com
                        </div>
                    </div>

                    <div className="w-full md:w-1/3">
                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">{formTitle} No.</label>
                        <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700">AUTOGENERADO</div>

                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Fecha de Emision</label>
                        <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700">2021-03-18</div>

                        <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Forma de Pago</label>
                        <select className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500">
                            <option>Corporate event</option>
                            <option>Wedding</option>
                            <option>Birthday</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
                
                
                {/* <div className="flex flex-wrap w-full mb-8">
                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase w-full tracking-wide">Datos Cliente:</label>

                    <div className="flex flex-wrap w-full justify-between">
                        <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-1/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="RUC / CI / Pasaporte" />
                        <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Telefono" />
                        <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-1/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Correo" />
                        <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-2/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Nombre / Empresa" />
                        <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full md:w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" type="text" placeholder="Direccion" />
                    </div>
                </div> */}
                

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

                <div className="flex flex-wrap justify-between mt-6">

                    <div className="w-full md:w-1/2 mb-6 md:mb-0">
                        <button 
                            onClick={handleShowModal}
                            className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded shadow-sm mr-4">
                            Añadir Producto
                        </button>
                    </div>

                    <ProductSearchModal show={showModal} handleClose={handleCloseModal} />

                    <div className="w-full md:w-1/2 lg:w-1/3">
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
                            <div className="text-sm text-gray-600 text-right flex-1">IVA (12%)</div>
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
                </div>

            </div>
        </div>
    )
}

