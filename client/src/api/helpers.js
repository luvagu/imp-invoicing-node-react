import axios from 'axios'

// Production URLs
// IMPSRV IP ==> 192.168.1.102
// SELF IP ==> 192.168.1.5
// VPS ==> https://imp-node-api.imporpernos.com
const API_URL = process.env.NODE_ENV === 'production' ? 'https://imp-node-api.imporpernos.com' : 'http://localhost:5000'

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
 * /doc-sequences (no params requiered)
 */

export const dataGetApi = async (searchRouteWithQuery) => {
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
 * DELETE API delete doc route with required 'folder' param
 * /delete-doc/:folder/:doc
 * /delete-all-docs/:folder
 */

export const deleteAllDocsApi = async (apiFolder) => {
    const { data } = await axios.delete(`${API_URL}/delete-all-docs/${apiFolder}`)
    return data
}

/**
 * PUT API update doc route with required 'folder & doc' params
 * /update-doc/:folder/:doc
 * /update-sequences/:prop/:value
 */

export const updateDocApi = async (apiFolder, docNum, docData) => {
    const { data } = await axios.put(`${API_URL}/update-doc/${apiFolder}/${docNum}`, docData)
    return data
}

export const updateSequencesApi = async (prop, value) => {
    const { data } = await axios.put(`${API_URL}/update-sequence/${prop}/${value}`)
    return data
}

/**
 * Tokens API 
 * GET --> param required field (id)
 * POST (create) --> body required fields { user, password }
 * PUT (renew) --> body required fields { id, extend }
 * DELETE --> param required field (id)
 */

export const getToken = async (id) => {
    const { data } = await axios.get(`${API_URL}/tokens/${id}`)
    return data
}

export const createToken = async (credentials) => {
    const { data } = await axios.post(`${API_URL}/tokens`, credentials)
    return data
}

export const renewToken = async (token) => {
    const { data } = await axios.put(`${API_URL}/tokens`, token)
    return data
}

export const deleteToken = async (id) => {
    const { data } = await axios.delete(`${API_URL}/tokens/${id}`)
    return data
}
