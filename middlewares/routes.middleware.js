const checkParams = (req, res, next) => {

    req.params.id = parseInt(req.params.id)

    if (isNaN(req.params.id))
        return res.json({
            error_code: 1,
            error_desc: 'Formato de id inválido'
        })

    next()
}

export const middlewares = {
    checkParams
}