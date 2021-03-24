
import useSearchApi from '../hooks/useSearchApi'

import SearchModalBody from './SearchModalBody'
import SearchModalResults from './SearchModalResults'

export default function ProductSearchModal({ handleClose, handleAddProduct }) {
	const [{ searchResults, isLoading, errorMsg }, setRouteWithQuery] = useSearchApi()

    const handleInputSearch = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'id': 
					setRouteWithQuery(`search-product-id/${encodeURIComponent(e.target.value)}`)
                    break
                case 'terms': 
					setRouteWithQuery(`search-product-includes/${encodeURIComponent(e.target.value)}`)
                    break
                default: setRouteWithQuery(null)
                    break
            }
        }
    }

	const handleSelectedProduct = (index) => {
		handleAddProduct(searchResults[index])
		handleClose()
	}

	return (
		<SearchModalBody 
			searchLabel='producto'
			inputIdName='id'
			inputIdPaceholder='Codigo exacto'
			inputTermsName='terms'
			inputTermsPaceholder='Codigo o nombre parcial'
			inputsHandle={handleInputSearch}
			handleClose={handleClose}
			isLoading={isLoading}
			errorMsg={errorMsg}
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
