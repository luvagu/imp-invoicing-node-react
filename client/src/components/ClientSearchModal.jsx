import useGetApi from '../hooks/useGetApi'

import ModalSearchHead from './ModalSearchHead'
import ModalSearchResults from './ModalSearchResults'

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
		<ModalSearchHead 
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
				<ModalSearchResults 
					labelId='CI / RUC' 
					labelName='Cliente' 
					results={searchResults} 
					handleSelectedItem={handleSelectedClient} 
				/>
			)}
		</ModalSearchHead>
	)
}
