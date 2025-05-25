const authorizedRoles = (roles) => {
    return (req, res, next) => {
        if (roles.includes(res.locals.user.rol)){
            next();
        }
        else {
            res.status(403).json({ message: "Usuario no autorizado" });
        }
    }
}

export default authorizedRoles;