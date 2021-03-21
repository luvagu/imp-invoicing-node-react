import { useEffect, useState } from 'react'
import { productsSearchApi } from '../api/helpers'
import Modal from './Modal'
import SearchResultsInModal from './SearchResultsInModal'
import Spinner from './Spinner'

export default function ProductSearchModal({ show, handleClose, handleAddProduct }) {
	const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')  
    const [searchRoute, setServerRoute] = useState('')
    const [searchTerm, setSearchTerm] = useState(null)
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (searchTerm === null || searchTerm === '') return

		setErrMsg('')
		setIsLoading(true)

        productsSearchApi(searchRoute, searchTerm)
            .then(data => {
				setIsLoading(false)
				setSearchResults(data)
			})
            .catch(err => {
				setIsLoading(false)
                setSearchResults([])
                setErrMsg(err.response?.data.Error || 'Network Error')
            })

    }, [searchRoute, searchTerm])

    const handleInputSearch = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'code': 
                    setServerRoute('get-single-product')
                    setSearchTerm(e.target.value)
					e.target.value = ''
					e.target.blur()
                    break
                case 'partial-code': 
                    setServerRoute('product-match-code')
                    setSearchTerm(e.target.value)
					e.target.value = ''
					e.target.blur()
                    break
                case 'partial-name':  
                    setServerRoute('product-match-terms')
                    setSearchTerm(e.target.value)
					e.target.value = ''
					e.target.blur()
                    break
                default:
                    break
            }
        }
    }

	const handleSelectedProduct = (index) => {
		console.log(searchResults[index])
		setSearchTerm(null)
		setSearchResults([])
		handleClose()
	}

	return (
		<Modal show={show}>
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

				<div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
					<h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">
						Buscar producto por:
					</h2>

					<div className="flex">
						<div className="mb-4 w-36 mr-2">
							<input
								className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
								type="text"
								name="code"
								placeholder="Codigo"
                                onKeyDown={handleInputSearch}
							/>
						</div>

						<div className="mb-4 w-36 mr-2">
							<input
								className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
								type="text"
								name="partial-code"
								placeholder="Codigo parcial"
                                onKeyDown={handleInputSearch}
							/>
						</div>

						<div className="mb-4 w-36">
							<input
								className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
								type="text"
								name="partial-name"
								placeholder="Nombre parcial"
                                onKeyDown={handleInputSearch}
							/>
						</div>
					</div>

					{isLoading && <div className="text-center"><Spinner/></div>}

					{searchResults && searchResults.length > 0 
						? <SearchResultsInModal results={searchResults} handleSelectedProduct={handleSelectedProduct} /> 
						: (<div className="mb-4 px-4 text-center text-red-600 font-semibold uppercase">{errMsg}</div>)
					}

					<div className="mt-8 text-right">
						<button
							type="button"
							className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm"
                            onClick={handleClose}
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
