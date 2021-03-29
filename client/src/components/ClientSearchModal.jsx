import useGetApi from '../hooks/useGetApi'

import SearchModalBody from './SearchModalBody'
import SearchModalResults from './SearchModalResults'

export default function ClientSearchModal({ closeModal, handleAddClient }) {
	const [{ searchResults, isLoading, errorMsg }, setRouteWithQuery] = useGetApi()

    const handleInputSearch = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'id': 
					setRouteWithQuery(`/search-client-id/${encodeURIComponent(e.target.value)}`)
                    break
                case 'query': 
					setRouteWithQuery(`/search-client-name/${encodeURIComponent(e.target.value)}`)
                    break
                default: setRouteWithQuery(null)
                    break
            }
        }
    }

	const handleSelectedClient = (index) => {
		handleAddClient(searchResults[index])
		closeModal()
	}

	return (
		<SearchModalBody 
			searchLabel='cliente'
			inputIdName='id'
			inputIdPaceholder='Cedula o RUC'
			inputQueryName='query'
			inputQueryPaceholder='Nombre o Empresa'
			inputsHandle={handleInputSearch}
			closeModal={closeModal}
			isLoading={isLoading}
			errorMsg={errorMsg}
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
