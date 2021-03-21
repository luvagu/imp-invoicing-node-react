import { useEffect, useState } from 'react'
import { dataSearchApi } from '../api/helpers'

import SearchModalBody from './SearchModalBody'
import SearchModalResults from './SearchModalResults'

export default function ClientSearchModal({ handleClose, handleAddClient }) {
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

    const handleInputSearch = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'id': 
                    setServerRoute('search-client-id')
                    setSearchTerm(e.target.value)
                    break
                case 'name': 
                    setServerRoute('search-client-name')
                    setSearchTerm(e.target.value)
                    break
                default:
                    break
            }
        }
    }

	const handleSelectedClient = (index) => {
		console.log(searchResults[index])
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
