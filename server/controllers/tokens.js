const { createToken, deleteDoc, readDoc, updateDoc, getUserToken, verifyUser } = require('../lib/helpers')

// Get token data
const getToken = async (req, res) => {
    const id = req.params.id

    try {
        const token = await readDoc('tokens', id)
        res.status(200).send(token)
    } catch (error) {
        console.log('Error on Get path >>> /tokens', error.message)
        res.status(500).send({ error: 'No se pudo crear el token' })
    }
}

// Verify user, get, create and send token
const postToken = async (req, res) => {
    const { user, password } = req.body

    try {
        // Verify user
        if (await verifyUser(user, password)) {
            // Get the token
            const token = await getUserToken(user)

            // Save the token
            await createToken(token.id, token)
            
            res.status(200).send(token)
        } else {
            res.status(401).send({ error: 'No autorizado. Usuario o contraseña incorrectos' })
        }
    } catch (error) {
        console.log('Error on Post path >>> /tokens', error.message)
        res.status(500).send({ error: 'No se pudo leer la base de datos' })
    }
}

// Renew token
const putToken = async (req, res) => {
    const { id, extend } = req.body

    try {
        const existingToken = await readDoc('tokens', id)

        // Verify that the token isn't already expired
        if (existingToken.expires > Date.now() && extend) {
            // Update the expiration date 12 hour from now
            existingToken.expires = Date.now() + 1000 * 60 * 60 * 12

            // Save the token
            await updateDoc('tokens', id, existingToken)

            res.status(200).send(existingToken)
        } else {
            res.status(200).send(false)
        }
        
    } catch (error) {
        console.log('Error on Put path >>> /tokens', error.message)
        res.status(500).send({ error: 'No se pudo renovar el token' })
    }
}

// Delete a token
const deleteToken = async (req, res) => {
    const id = req.params.id

    try {
        await deleteDoc('tokens', id)
        res.status(200).send({ message: 'Token eliminado' })
    } catch (error) {
        console.log('Error on Delete path >>> /tokens', error.message)
        res.status(500).send({ error: 'No se pudo eliminar el token' })
    }
}

module.exports = {
    getToken,
    postToken,
    putToken,
    deleteToken
}
