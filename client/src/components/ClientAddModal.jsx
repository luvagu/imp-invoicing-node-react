import { useState } from "react"
import Input from "./Input"

export default function ClientAddModal({ handleAddClient, closeModal, data }) {
	const [clientData, setclientData] = useState(data ? { ...data } : {})
	const [errorMsg, setErrorMsg] = useState('')

	const handleChange = (e) => {
		const newData = { ...clientData }
		newData[e.target.name] = e.target.value
		setclientData(newData)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { id, name, address, phone, email } = clientData
		if (!id || !name || !address || !phone || !email) {
			setErrorMsg('Todos los campos son requeridos')
			return
		}
		handleAddClient(clientData)
		closeModal()
	}

    return (
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
						<Input extraClass='mb-1 py-2 px-4' name='id' value={clientData.id} placeholder='Cedula o RUC' onChange={handleChange} />
					</div>

					<div className="w-1/3 mr-2">
						<Input extraClass='mb-1 py-2 px-4' name='phone' value={clientData.phone} placeholder='Telefono' onChange={handleChange} />
					</div>

					<div className="w-1/3">
						<Input extraClass='mb-1 py-2 px-4' type='email' name='email' value={clientData.email} placeholder='Email' onChange={handleChange} />
					</div>
				</div>

				<div className="w-full">
					<Input extraClass='mb-1 py-2 px-4' name='name' value={clientData.name} placeholder='Nombre o Empresa' onChange={handleChange} />

					<Input extraClass='mb-1 py-2 px-4' name='address' value={clientData.address} placeholder='Direccion' onChange={handleChange} />
				</div>
			</div>

			{errorMsg && <div className="mb-6 px-4 text-center text-sm text-red-600 font-semibold uppercase">{errorMsg}</div>}

			<div className="flex justify-end items-center">
				{/* {isLoading && <div className="mr-4"><Spinner /></div>} */}
				<button
					type="submit"
					className="mr-2 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 border border-indigo-600 rounded shadow-sm"
					onClick={handleSubmit}
				>
					{data ? 'Actualizar' : 'Añadir'}
				</button>
				<button
					type="button"
					className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm"
					onClick={closeModal}
				>
					Cancelar
				</button>
			</div>
		</form>
	)
}
