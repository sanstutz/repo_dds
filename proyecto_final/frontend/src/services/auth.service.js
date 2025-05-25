import httpService from "./http.service.js";
import { config } from "../config.js";
import modalService from "./modalDialog.service.js";

const login = async (usuario, clave, navigateToComponent) => {
    let response = await httpService.post(config.urlServidor + "/api/login", {
        usuario,
        clave,
    });

    if (response.data?.accessToken) {
        sessionStorage.setItem("usuarioLogueado", usuario);
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.refreshToken);
        if (CambioUsuarioLogueado) CambioUsuarioLogueado(usuario);
        {
            navigateToComponent();
        }
    } else {
        if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
        modalService.Alert("Usuario o clave incorrectos");
    }
};

const logout = () => {
    sessionStorage.removeItem("usuarioLogueado");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
};

const getUsuarioLogueado = () => {
    return sessionStorage.getItem("usuarioLogueado");
};

let CambioUsuarioLogueado = null;
const subscribeUsuarioLogueado = (x) => (CambioUsuarioLogueado = x);

const AuthService = {
    login,
    logout,
    getUsuarioLogueado,
    subscribeUsuarioLogueado
};

export default AuthService;
