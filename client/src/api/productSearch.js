import axios from 'axios'

export const productsSearchApi = async (searchRoute, searchTerm) => {
    const { data } = await axios.get(`http://localhost:5000/${searchRoute}/${searchTerm}`)
    return data
}