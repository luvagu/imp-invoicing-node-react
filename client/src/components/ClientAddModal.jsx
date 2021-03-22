import { useState } from "react"

export default function ClientAddModal({ handleClose, handleAddClient, data }) {
	const [clientData, setclientData] = useState(data ? { ...data } : {})
	const [errorMsg, setErrorMsg] = useState('')

	const handleChange = (name, value) => {
		const newData = { ...clientData }
		newData[name] = value
		setclientData(newData)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { id, name, address, phone, email } = clientData
		if (!id || !name || !address || !phone || !email) {
			setErrorMsg('Todos los campos requeridos')
			return
		}
		handleAddClient(clientData)
		handleClose()
	}

    return (
		<>
			<div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
				<div 
                    className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
                    onClick={handleClose}
                >
					<svg
						className="fill-current w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
					</svg>
				</div>

				<form 
					className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8"
					onSubmit={handleSubmit}
				>
					<h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">
						Añadir cliente nuevo:
					</h2>

					<div className="flex flex-col mb-6">
                        <div className="flex w-full">
                            <div className="w-1/3 mr-2">
                                <input
                                    className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
                                    type="text"
                                    placeholder="Cedula o RUC"
									value={clientData.id || ''}
                                    onChange={(e) => handleChange('id', e.target.value)}
                                />
                            </div>

                            <div className="w-1/3 mr-2">
                                <input
                                    className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
                                    type="text"
                                    placeholder="Telefono"
									value={clientData.phone || ''}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                />
                            </div>

                            <div className="w-1/3">
                                <input
                                    className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
                                    type="email"
                                    placeholder="Email"
									value={clientData.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                />
                            </div>
                        </div>

						<div className="w-full">
							<input
								className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
								type="text"
								placeholder="Nombre o Empresa"
								value={clientData.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
							/>

                            <input
								className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500"
								type="text"
								placeholder="Direccion"
								value={clientData.address || ''}
                                onChange={(e) => handleChange('address', e.target.value)}
							/>
						</div>
					</div>

					{errorMsg && <div className="mb-6 px-4 text-center text-red-600 font-semibold uppercase">{errorMsg}</div>}

					<div className="flex justify-end items-center">
						{/* {isLoading && <div className="mr-4"><Spinner /></div>} */}
                        <button
							type="submit"
							className="mr-2 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 border border-indigo-600 rounded shadow-sm"
                            onClick={handleSubmit}
						>
							Añadir
						</button>
						<button
							type="button"
							className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm"
                            onClick={handleClose}
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</>
	)
}
