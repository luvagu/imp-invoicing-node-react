import { useEffect, useState } from 'react'
import { dataSearchApi } from '../api/helpers'

import SearchModalBody from './SearchModalBody'
import SearchModalResults from './SearchModalResults'

export default function ProductSearchModal({ handleClose, handleAddProduct }) {
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

	const handleSelectedProduct = (index) => {
		console.log(searchResults[index])
		handleAddProduct(searchResults[index])
		setSearchTerm(null)
		setSearchResults([])
		handleClose()
	}

	return (
		<SearchModalBody 
			searchLabel='product'
			inputIdName='id'
			inputIdPaceholder='Codigo exacto'
			inputTermsName='terms'
			inputTermsPaceholder='Codigo o nombre parcial'
			inputsHandle={handleInputSearch}
			handleClose={handleClose}
			isLoading={isLoading}
			errorMsg={errMsg}
		>
			{searchResults && searchResults.length > 0 && (
				<SearchModalResults 
					labelId='Codigo' 
					labelName='Producto' 
					results={searchResults} 
					handleSelectedItem={handleSelectedProduct} 
				/>
			)}
		</SearchModalBody>
	)
}
