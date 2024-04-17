import { Router } from "express";
import registroControlador from "../controller/registrarControlador";



class RegistoRuta {

    public apiRutaRegistro: Router;

    constructor() {
        this.apiRutaRegistro = Router();
        this.cargarRutas();
    }

    private cargarRutas(): void {
        this.apiRutaRegistro.post("/user", registroControlador.registroUsuario);
    }

}

const registroRuta = new RegistoRuta();
export default registroRuta.apiRutaRegistro;