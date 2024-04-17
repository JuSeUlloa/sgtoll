import { Router } from "express";
import RutaControlador from "../controller/rutaControlador";

class RutaRoute {
    public apiRuta: Router;

    constructor() {
        this.apiRuta = Router();
        this.cargarRutas();
    }

    private cargarRutas(): void {
        this.apiRuta.post("/add", RutaControlador.crearRuta);
        this.apiRuta.get("/list", RutaControlador.obtenerRutas);
        this.apiRuta.put("/update", RutaControlador.actualizarRuta);
        this.apiRuta.delete("/delete/:codRuta", RutaControlador.eliminarRuta);
    }

}
const rutaRoute = new RutaRoute();
export default rutaRoute.apiRuta;        