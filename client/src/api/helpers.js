import axios from 'axios'

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
    const { data } = await axios.get(`http://localhost:5000/${searchRouteWithQuery}`)
    return data
}

/**
 * POST API create doc route with required 'folder' param
 * /create-doc/:folder
 */

export const createDocApi = async (apiFolder, docData) => {
    const { data } = await axios.post(`http://localhost:5000/create-doc/${apiFolder}`, docData)
    return data
}

/**
 * PUT API update doc route with required 'folder & doc' params
 * /update-doc/:folder/:doc
 */

export const updateDocApi = async (apiFolder, docNum, docData) => {
    const { data } = await axios.put(`http://localhost:5000/update-doc/${apiFolder}/${docNum}`, docData)
    return data
}