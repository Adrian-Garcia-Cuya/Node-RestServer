import { validationResult } from 'express-validator';

const validateFields = ( req, res, next ) => {
    //validationResult -> extrae los errores de validacion de un 'request' (req)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();
}

export { validateFields };