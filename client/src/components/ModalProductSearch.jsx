
import useGetApi from '../hooks/useGetApi'

import ModalSearchHead from './ModalSearchHead'
import ModalSearchResults from './ModalSearchResults'

export default function ModalProductSearch({ closeModal, handleAddProduct }) {
	const [{ searchResults, isLoading, errorMsg }, setRouteWithQuery] = useGetApi()

    const handleInputSearch = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'id': 
					setRouteWithQuery(`/search-product-id/${encodeURIComponent(e.target.value)}`)
                    break
                case 'query': 
					setRouteWithQuery(`/search-product-includes/${encodeURIComponent(e.target.value)}`)
                    break
                default: setRouteWithQuery(null)
                    break
            }
        }
    }

	const handleSelectedProduct = (index) => {
		handleAddProduct(searchResults[index])
		closeModal()
	}

	return (
		<ModalSearchHead 
			searchLabel='producto'
			inputIdName='id'
			inputIdPaceholder='Codigo exacto'
			inputQueryName='query'
			inputQueryPaceholder='Codigo o nombre parcial'
			inputsHandle={handleInputSearch}
			closeModal={closeModal}
			isLoading={isLoading}
			errorMsg={errorMsg}
		>
			{searchResults && searchResults.length > 0 && (
				<ModalSearchResults 
					labelId='Codigo' 
					labelName='Producto' 
					results={searchResults} 
					handleSelectedItem={handleSelectedProduct} 
				/>
			)}
		</ModalSearchHead>
	)
}
