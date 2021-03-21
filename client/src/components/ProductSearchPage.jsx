import { useEffect, useState } from 'react'
import { dataSearchApi } from '../api/helpers'

import SearchResultsPage from './SearchResultsPage'
import Spinner from './Spinner'

export default function ProductSearchPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')  
    const [searchRoute, setServerRoute] = useState('')
    const [searchTerm, setSearchTerm] = useState(null)
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (searchTerm === null || searchTerm === '') return

        setErrMsg('')
		setIsLoading(true)

        dataSearchApi(searchRoute, searchTerm)
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'id': 
                    setServerRoute('search-product-id')
                    setSearchTerm(e.target.value)
                    break
                case 'terms': 
                    setServerRoute('search-product-terms')
                    setSearchTerm(e.target.value)
                    break
                default:
                    break
            }
        }
    }

	return (
        <div className="container mx-auto px-6 py-8">

			<h3 className="text-black text-3xl font-medium">Buscar por:</h3>

            <div className="flex flex-wrap mt-6">
                <SearchInput fieldName='id' placeHolder='Codigo exacto' extraClass='mb-4 md:mb-0 mr-4' handle={handleKeyDown} />
                <SearchInput fieldName='terms' placeHolder='Codigo o nombre parcial' handle={handleKeyDown} />
            </div>

            {isLoading && <div className="mt-6 text-center"><Spinner /></div>}

            {searchResults && searchResults.length > 0 
                ? <SearchResultsPage results={searchResults} /> 
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
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full pl-10 pr-4 text-gray-700 focus:outline-none focus:bg-white focus:border-indigo-600"
                type="text"
                name={fieldName}
                placeholder={placeHolder}
            />
        </div>
    )
}