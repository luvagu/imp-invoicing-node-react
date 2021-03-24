import axios from 'axios'

export const dataSearchApi = async (searchRouteWithQuery) => {
    const { data } = await axios.get(`http://localhost:5000/${searchRouteWithQuery}`)
    return data
}

export const createDocApi = async (apiFolder, docData) => {
    const { data } = await axios.post(`http://localhost:5000/create-doc/${apiFolder}`, docData)
    return data
}

export const updateDocApi = async (apiFolder, docNum, docData) => {
    const { data } = await axios.put(`http://localhost:5000/update-doc/${apiFolder}/${docNum}`, docData)
    return data
}