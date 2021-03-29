import { useEffect, useState } from 'react'
import { dataGetApi } from '../api/helpers'

const useGetApi = () => {
	const [errorMsg, setErrorMsg] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [searchResults, setSearchResults] = useState(null)
	const [searchRouteWithQuery, setSearchRouteWithQuery] = useState(null)

	useEffect(() => {
		if (searchRouteWithQuery === null || searchRouteWithQuery === '') return

		let didCancel = false

		const fetchData = async () => {
			setErrorMsg('')
			setIsLoading(true)

			try {
				const results = await dataGetApi(searchRouteWithQuery)
				if (!didCancel) setSearchResults(results)
			} catch (error) {
				if (!didCancel) {
					setSearchResults(null)
					setErrorMsg(error.response?.data.error || 'Network Error')
				}
			}

			setIsLoading(false)
		}

		fetchData()

		return () => didCancel = true
	}, [searchRouteWithQuery])

	return [{ searchResults, isLoading, errorMsg }, setSearchRouteWithQuery]
}

export default useGetApi
