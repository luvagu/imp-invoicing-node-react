import { useEffect, useState } from 'react'
import { productsSearchApi } from '../api/productSearch'

import SearchResultsInPage from './SearchResultsInPage'

export default function ProductSearchPage() {
    const [errMsg, setErrMsg] = useState('')  
    const [searchRoute, setServerRoute] = useState('')
    const [searchTerm, setSearchTerm] = useState(null)
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (searchTerm === null || searchTerm === '') return

        productsSearchApi(searchRoute, searchTerm)
            .then(data => setSearchResults(data))
            .catch(err => {
                setSearchResults([])
                setErrMsg(err.response?.data.Error || 'Network Error')
            })

    }, [searchRoute, searchTerm])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'code': 
                    setServerRoute('get-single-product')
                    setSearchTerm(e.target.value)
                    break
                case 'partial-code': 
                    setServerRoute('product-match-code')
                    setSearchTerm(e.target.value)
                    break
                case 'partial-name':  
                    setServerRoute('product-match-terms')
                    setSearchTerm(e.target.value)
                    break
                default:
                    break
            }
        }
    }

	return (
        <div className="container mx-auto px-6 py-8">

			<h3 className="text-gray-700 text-3xl font-medium">Buscar por:</h3>

            <div className="flex flex-wrap mt-4">
                <SearchInput fieldName='code' placeHolder='Codigo' extraClass='mb-4 md:mb-0 mr-4' handle={handleKeyDown} />
                <SearchInput fieldName='partial-code' placeHolder='Codigo parcial' extraClass='mb-4 md:mb-0 mr-4' handle={handleKeyDown} />
                <SearchInput fieldName='partial-name' placeHolder='Nombre parcial' handle={handleKeyDown} />
            </div>

            {searchResults && searchResults.length > 0 
                ? <SearchResultsInPage results={searchResults} /> 
                : (<div className="mt-6 px-4 text-center text-red-600 font-semibold uppercase">{errMsg}</div>)
            }
        </div>
	)
}

function SearchInput({ fieldName, placeHolder, extraClass = '', handle }) {
    return (
        <div className={`relative ${extraClass}`}>
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>
            </span>

            <input
                onKeyDown={handle}
                className="form-input w-full md:w-44 rounded-md pl-10 pr-4 focus:border-indigo-600"
                type="text"
                name={fieldName}
                placeholder={placeHolder}
            />
        </div>
    )
}