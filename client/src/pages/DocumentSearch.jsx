import { useState } from 'react'
import useSearchApi from '../hooks/useSearchApi'

import DocumentSearchResults from '../components/DocumentSearchResults'
import Spinner from '../components/Spinner'
import Input from '../components/Input'

export default function DocumentSearch() {
    const [isRequired, setIsRequired] = useState(false)
    const [routeFolder, setRouteFolder] = useState('')
    const [{ searchResults, isLoading, errorMsg }, setRouteWithQuery] = useSearchApi()

    const handleChange = (e) => {
        setRouteFolder(e.target.value)
        setIsRequired(false)
        console.log(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!routeFolder) {
                setIsRequired(true)
                return
            }

            switch (e.target.value) {
                case '*': 
					setRouteWithQuery(`list-docs/${routeFolder}`)
                    break
                default: setRouteWithQuery(`get-doc/${routeFolder}/${(e.target.value)}`)
                    break
            }
        }
    }

	return (
        <div className="container mx-auto px-6 py-6">

			<h3 className="text-black text-3xl font-medium">Buscar documentos por:</h3>

            <div className="flex flex-wrap mt-6">
                <div className="mb-4 md:mb-0 mr-4">
                    <select 
                        className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 pl-4 pr-8 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500 ${isRequired ? 'border-red-600' : ''}`}
                        onChange={handleChange}
                    >
                        <option>Tipo de documento</option>
                        <option value="egresos">Egresos</option>
                        <option value="facturas">Facturas</option>
                        <option value="proformas">Proformas</option>
                    </select>
                </div>
                
                <SearchInput name='docNum' placeholder='Numero o (*) para todos' handle={handleKeyDown} />
            </div>

            {isLoading && <div className="mt-6 text-center"><Spinner /></div>}

            {searchResults && searchResults.length > 0 && <DocumentSearchResults results={searchResults} routeFolder={routeFolder} />}

            {errorMsg && <div className="mt-6 px-4 text-center text-sm text-red-600 font-semibold uppercase">{errorMsg}</div>}
        </div>
	)
}

function SearchInput({ name, placeholder, extraClass = '', handle }) {
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

            <Input
                extraClass="pl-10 pr-4"
                type="search"
                name={name}
                placeholder={placeholder}
                onKeyDown={handle}
            />
        </div>
    )
}