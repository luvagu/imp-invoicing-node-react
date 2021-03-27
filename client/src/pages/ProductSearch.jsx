import useSearchApi from '../hooks/useSearchApi'

import ProductSearchResults from '../components/ProductSearchResults'
import Spinner from '../components/Spinner'
import Input from '../components/Input'
import { SvgSearch } from '../icons'

export default function ProductSearch() {
    const [{ searchResults, isLoading, errorMsg }, setRouteWithQuery] = useSearchApi()

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

            <div className="flex flex-wrap mt-6">
                <SearchInput extraClass='mb-4 md:mb-0 mr-4' name='id' placeholder='Codigo exacto' handle={handleKeyDown} />
                <SearchInput name='includes' placeholder='Codigo o nombre parcial' handle={handleKeyDown} />
            </div>

            {isLoading && <div className="mt-6 text-center"><Spinner /></div>}

            {searchResults && searchResults.length > 0 && <ProductSearchResults results={searchResults} />}

            {errorMsg && <div className="mt-6 px-4 text-center text-sm text-red-600 font-semibold uppercase">{errorMsg}</div>}
        </div>
	)
}

function SearchInput({ name, placeholder, extraClass = '', handle }) {
    return (
        <div className={`relative ${extraClass}`}>
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <SvgSearch className="h-5 w-5"/>
            </span>

            <Input
                extraClass="pl-10 pr-4"
                type="search"
                name={name}
                placeholder={placeholder}
                onKeyDown={handle}
            />
        </div>
    )
}
