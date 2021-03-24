import useSearchApi from '../hooks/useSearchApi'

import SearchModalBody from './SearchModalBody'
import SearchModalResults from './SearchModalResults'

export default function ClientSearchModal({ closeModal, handleAddClient }) {
	const [{ searchResults, isLoading, errorMsg }, setRouteWithQuery] = useSearchApi()

    const handleInputSearch = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'id': 
					setRouteWithQuery(`search-client-id/${encodeURIComponent(e.target.value)}`)
                    break
                case 'name': 
					setRouteWithQuery(`search-client-name/${encodeURIComponent(e.target.value)}`)
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
			inputTermsName='name'
			inputTermsPaceholder='Nombre o Empresa'
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
