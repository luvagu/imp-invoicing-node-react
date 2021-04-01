import { useEffect, useState } from 'react'
import { dataGetApi, deleteAllDocsApi, updateSequencesApi } from '../api/helpers'

import Input from '../components/Input'
import Spinner from '../components/Spinner'

export default function Settings({ privileges }) {
    const [newSequence, setNewSequence] = useState(0)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    const handleChange = (e) => {
        const match = e.target.value.match(/[0-9]/g)
        const numbers = match ? match.join('') : ''
        setNewSequence(numbers)
        return e.target.value = numbers
    }

    const handleClick = async () => {
        setIsLoading(true)
        try {
            const response = await updateSequencesApi('facturas', newSequence)
            setSuccessMsg(response.message)
        } catch (error) {
            console.error(error.response?.data.error)
            setErrorMsg(error.response?.data.error || 'Network Error')
        }
        setIsLoading(false)
    }

    const handleDocsDelete = async (apiFolder) => {
        setIsLoading(true)
        try {
            const response = await deleteAllDocsApi(apiFolder)
            setSuccessMsg(response.message)
        } catch (error) {
            console.error(error.response?.data.error)
            setErrorMsg(error.response?.data.error || 'Network Error')
        }
        setIsLoading(false)
    }

    useEffect(() => {
        let isDone = false
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const sequences = await dataGetApi('/doc-sequences')
                if (!isDone) setNewSequence(sequences.facturas)
            } catch (error) {
                if (!isDone) {
                    console.log(error.response?.data.error)
                    setErrorMsg(error.response?.data.error || 'Network Error')
                }
            }
            setIsLoading(false)
        }
        fetchData()
        
        return () => isDone = true
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrorMsg('')
            setSuccessMsg('')
        }, 5000)

        return () => clearTimeout(timeout)
    }, [errorMsg, successMsg])

    return (
        <div className="container sm:sm-mw md:md-mw lg:lg-mw mx-auto px-4 md:px-6 py-4 md:py-6">
            <h3 className="text-black text-3xl font-medium">Ajustes</h3>

            <div className="flex flex-col mt-6">
                <label className="text-gray-800 block mb-2 font-bold text-sm uppercase">Actualizar secuencia de facturas</label>
                <div className="w-full sm:w-64"><Input type='text' name='facturas' placeholder='Secuencia de facturas' value={newSequence} onChange={handleChange} /></div>
            </div>

            <div className="flex items-center mt-2">
				<button
					type="button"
					className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 border border-indigo-600 rounded shadow-sm"
                    onClick={handleClick}
                >
					Guardar
				</button>
                {isLoading && <div className="ml-4"><Spinner /></div>}
			</div>

            {privileges === 'admin' && (
                <div className="flex flex-col mt-6 w-full sm:w-64 space-y-2">
                    <label className="text-red-600 block mb-2 font-bold text-sm uppercase">Zona de peligro</label>
                    
                    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-4 border border-red-600 rounded shadow-sm"
                        onClick={() => handleDocsDelete('egresos')}
                    >
                        Eliminar Egresos
                    </button>

                    <button
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 border border-indigo-600 rounded shadow-sm"
                        onClick={() => handleDocsDelete('facturas')}
                    >
                        Eliminar Facturas
                    </button>

                    <button
                        type="button"
                        className="bg-yellow-600 hover:bg-yellow-800 text-white font-semibold py-2 px-4 border border-yellow-600 rounded shadow-sm"
                        onClick={() => handleDocsDelete('proformas')}
                    >
                        Eliminar Proformas
                    </button>
                </div>
            )}

            {errorMsg && <div className="mt-6 px-4 text-center text-sm text-red-600 font-semibold uppercase">{errorMsg}</div>}
            {successMsg && <div className="mt-6 px-4 text-center text-sm text-green-600 font-semibold uppercase">{successMsg}</div>}
        </div>
    )
}
