import { useState } from 'react'
import useSearchApi from '../hooks/useSearchApi'

import DocumentSearchResults from '../components/DocumentSearchResults'
import Spinner from '../components/Spinner'
import SearchInput from '../components/SearchInput'

export default function DocumentSearch() {
    const [isRequired, setIsRequired] = useState(false)
    const [routeFolder, setRouteFolder] = useState('')
    const [{ searchResults, isLoading, errorMsg }, setRouteWithQuery] = useSearchApi()

    const handleChange = (e) => {
        setRouteFolder(e.target.value)
        setIsRequired(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!routeFolder) {
                setIsRequired(true)
                return
            }

            switch (e.target.value) {
                case '*': 
					setRouteWithQuery(`/list-docs/${routeFolder}`)
                    break
                default: setRouteWithQuery(`/list-docs/${routeFolder}/${(e.target.value)}`)
                    break
            }
        }
    }

	return (
        <div className="container sm:sm-mw md:md-mw lg:lg-mw mx-auto px-4 md:px-6 py-4 md:py-6">

			<h3 className="text-black text-3xl font-medium">Buscar documentos por:</h3>

            <div className="flex flex-wrap mt-6">
                <select 
                    className={`mb-4 md:mb-0 mr-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 pl-4 pr-8 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500 ${isRequired ? 'border-red-600' : ''}`}
                    onChange={handleChange}
                >
                    <option>Tipo de documento</option>
                    <option value="egresos">Egresos</option>
                    <option value="facturas">Facturas</option>
                    <option value="proformas">Proformas</option>
                </select>
                
                <SearchInput name='docNum' placeholder='Numero o (*) para todos' handle={handleKeyDown} />
            </div>

            {isLoading && <div className="mt-6 text-center"><Spinner /></div>}

            {searchResults && searchResults.length > 0 && <DocumentSearchResults results={searchResults} routeFolder={routeFolder} />}

            {errorMsg && <div className="mt-6 px-4 text-center text-sm text-red-600 font-semibold uppercase">{errorMsg}</div>}
        </div>
	)
}
