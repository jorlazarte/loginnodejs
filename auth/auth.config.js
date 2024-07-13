const seconds = 60

export const config = {
    secretKey: 'login-nodejs',
    token: {
        // En string declaramos la unidad (m, s, h, d), en number los segundos
        // tokenExpiresIn: 30
        // expiresIn: '1h',
        expiresIn: '1h', //10 segundos
    },
    cookie:
    {
        maxAge: seconds * 10000, // 60 * 1000 son 60 segundos
        httpOnly: true, //no permite manipular desde js
        signed: true
    }

}