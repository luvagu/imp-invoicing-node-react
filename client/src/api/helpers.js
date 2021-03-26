import axios from 'axios'

// IMPSRV IP 192.168.1.102
// SELF IP 192.168.1.5
const API_URL = process.env.NODE_ENV === 'production' ? 'http://192.168.1.5:5000' : 'http://localhost:5000'

/**
 * Currently available folder names [egresos, facturas, proformas]
 * any other folder names will get a 404
 */

/**
 * GET API routes with required 'query, folder & doc' params
 * /search-client-id/:query
 * /search-client-name/:query
 * /search-product-includes/:query
 * /search-product-id/:query
 * /list-docs/:folder/:doc? (optinal 'doc' param)
 * /get-doc/:folder/:doc
 */

export const dataSearchApi = async (searchRouteWithQuery) => {
    const { data } = await axios.get(`${API_URL}${searchRouteWithQuery}`)
    return data
}

/**
 * POST API create doc route with required 'folder' param
 * /create-doc/:folder
 */

export const createDocApi = async (apiFolder, docData) => {
    const { data } = await axios.post(`${API_URL}/create-doc/${apiFolder}`, docData)
    return data
}

/**
 * PUT API update doc route with required 'folder & doc' params
 * /update-doc/:folder/:doc
 */

export const updateDocApi = async (apiFolder, docNum, docData) => {
    const { data } = await axios.put(`${API_URL}/update-doc/${apiFolder}/${docNum}`, docData)
    return data
}