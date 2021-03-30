import { useEffect, useState } from "react"

const useLocalStorage = (localStorageKey) => {
	const [value, setValue] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || '')

	useEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(value))
	}, [value, localStorageKey])

	return [value, setValue]
}

export default useLocalStorage
