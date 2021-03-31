import useGetApi from '../hooks/useGetApi'

import ProductSearchResults from '../components/ProductSearchResults'
import Spinner from '../components/Spinner'
import SearchInput from '../components/SearchInput'

export default function ProductSearch() {
    const [{ searchResults, isLoading, errorMsg }, setRouteWithQuery] = useGetApi()

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            switch (e.target.name) {
                case 'id': 
					setRouteWithQuery(`/search-product-id/${encodeURIComponent(e.target.value)}`)
                    break
                case 'includes': 
					setRouteWithQuery(`/search-product-includes/${encodeURIComponent(e.target.value)}`)
                    break
                default: setRouteWithQuery(null)
                    break
            }
        }
    }

	return (
        <div className="container sm:sm-mw md:md-mw lg:lg-mw mx-auto px-4 md:px-6 py-4 md:py-6">

			<h3 className="text-black text-3xl font-medium">Buscar productos por:</h3>

            <div className="flex flex-wrap md:flex-nowrap mt-6">
                <SearchInput extraClass='mb-4 md:mb-0 mr-0 md:mr-4 w-full md:w-1/3' name='id' placeholder='Codigo exacto' handle={handleKeyDown} />
                <SearchInput extraClass='w-full md:w-2/3' name='includes' placeholder='Codigo o nombre parcial' handle={handleKeyDown} />
            </div>

            {isLoading && <div className="mt-6 text-center"><Spinner /></div>}

            {searchResults && searchResults.length > 0 && <ProductSearchResults results={searchResults} />}

            {errorMsg && <div className="mt-6 px-4 text-center text-sm text-red-600 font-semibold uppercase">{errorMsg}</div>}
        </div>
	)
}
