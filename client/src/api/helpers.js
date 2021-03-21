import axios from 'axios'

export const dataSearchApi = async (searchRoute, searchTerm) => {
    const { data } = await axios.get(`http://localhost:5000/${searchRoute}/${encodeURIComponent(searchTerm)}`)
    return data
}