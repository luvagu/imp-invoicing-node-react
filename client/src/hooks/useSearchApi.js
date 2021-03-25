import { useEffect, useState } from 'react'
import { dataSearchApi } from '../api/helpers'

const useSearchApi = () => {
	const [errorMsg, setErrorMsg] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [searchResults, setSearchResults] = useState(null)
	const [searchRouteWithQuery, setSearchRouteWithQuery] = useState(null)

	useEffect(() => {
		if (searchRouteWithQuery === null || searchRouteWithQuery === '') return

		const fetchData = async () => {
			setErrorMsg('')
			setIsLoading(true)

			try {
				const results = await dataSearchApi(searchRouteWithQuery)
				setSearchResults(results)
			} catch (error) {
				setSearchResults(null)
				setErrorMsg(error.response?.data.error || 'Network Error')
			}

			setIsLoading(false)
		}

		fetchData()
	}, [searchRouteWithQuery])

	return [{ searchResults, isLoading, errorMsg }, setSearchRouteWithQuery]
}

export default useSearchApi
