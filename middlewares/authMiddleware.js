const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {

    // Se obtiene el token del usuario envido
    const token = req.header('Authorization');

    // Si no se proporciona un token, devuelve un error de no autorizado
    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    try {
        // Verifica el token utilizando
        const decoded = jwt.verify(token, 'secreto');

        // Almacena la información del usuario en req.user para que esté disponible en las rutas
        req.user = decoded;

        // Continúa con la siguiente función de middleware o ruta
        next();
        
    } catch (error) {
        res.status(401).json({ error: 'Token no válido' });
    }
}

module.exports = authMiddleware;
