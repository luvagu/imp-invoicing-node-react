import useSearchApi from '../hooks/useSearchApi'

// import { useEffect, useState } from 'react'
// import { dataSearchApi } from '../api/helpers'

import SearchModalBody from './SearchModalBody'
import SearchModalResults from './SearchModalResults'

export default function ClientSearchModal({ handleClose, handleAddClient }) {
	// const [isLoading, setIsLoading] = useState(false)
    // const [errMsg, setErrMsg] = useState('')  
    // const [searchRoute, setServerRoute] = useState('')
    // const [searchTerm, setSearchTerm] = useState(null)
    // const [searchResults, setSearchResults] = useState([])

    // useEffect(() => {
    //     if (searchTerm === null || searchTerm === '') return

	// 	setErrMsg('')
	// 	setIsLoading(true)

    //     dataSearchApi(searchRoute, searchTerm)
    //         .then(data => {
	// 			setIsLoading(false)
	// 			setSearchResults(data)
	// 		})
    //         .catch(err => {
	// 			setIsLoading(false)
    //             setSearchResults([])
    //             setErrMsg(err.response?.data.error || 'Network Error')
    //         })
	// 	setIsLoading(false)

    // }, [searchRoute, searchTerm])

	cosnt [{ searchResults, isLoading, errorMsg }, setRouteWithQuery] = useSearchApi()

    const handleInputSearch = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'id': 
					setRouteWithQuery(`search-client-id/${encodeURIComponent(e.target.value)}`)
                    // setServerRoute('search-client-id')
                    // setSearchTerm(e.target.value)
                    break
                case 'name': 
					setRouteWithQuery(`search-client-name/${encodeURIComponent(e.target.value)}`)
                    // setServerRoute('search-client-name')
                    // setSearchTerm(e.target.value)
                    break
                default:
                    break
            }
        }
    }

	const handleSelectedClient = (index) => {
		// console.log(searchResults[index])
		handleAddClient(searchResults[index])
		setSearchTerm(null)
		setSearchResults([])
		handleClose()
	}

	return (
		<SearchModalBody 
			searchLabel='client'
			inputIdName='id'
			inputIdPaceholder='Cedula o RUC'
			inputTermsName='name'
			inputTermsPaceholder='Nombre o Empresa'
			inputsHandle={handleInputSearch}
			handleClose={handleClose}
			isLoading={isLoading}
			errorMsg={errMsg}
		>
			{searchResults && searchResults.length > 0 && (
				<SearchModalResults 
					labelId='CI / RUC' 
					labelName='Cliente' 
					results={searchResults} 
					handleSelectedItem={handleSelectedClient} 
				/>
			)}
		</SearchModalBody>
	)
}
