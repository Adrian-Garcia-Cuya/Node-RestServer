import jwt from 'jsonwebtoken';


const generateJWT = ( uid = '' ) => {
    return new Promise(( resolve, reject ) => {
        
        const payload = { uid };

        //Generacion de token
        jwt.sign( payload, process.env.PRIVATE_KEY, {
            expiresIn: '4h',
        }, (err, token) => {

            if( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            }
            else{
                resolve(token);
            }
        });
    });
}

export { generateJWT };