import jwt from "jsonwebtoken";

const accessTokenSecret = "youraccesstokensecret"; // validar el login
const refreshTokenSecret = "yourrefreshtokensecrethere"; // validar la renovacion del token de acceso ?

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1]; // el header es Bearer <token> ?

        jwt.verify(token, accessTokenSecret, (error, user) => {
            if (error) {
                return res.status(403).json({ message: "token no es valido" });
            }
            res.locals.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "Acceso denegado" }); // no habia token
    }
}

export { authenticateJWT, accessTokenSecret, refreshTokenSecret };
