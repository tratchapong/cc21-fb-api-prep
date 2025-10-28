import createHttpError from 'http-errors'

export default (req, res, next) => {
    return next (createHttpError.NotFound())
}

