import { Router } from "express";
import peajeControlador from "../controller/peajeControlador";

class PeajeRuta {
    public apiRutaPeaje: Router;

    constructor() {
        this.apiRutaPeaje = Router();
        this.cargarRutas();
    }

    private cargarRutas(): void {
        this.apiRutaPeaje.post("/add", peajeControlador.crearPeaje);
        this.apiRutaPeaje.get("/list", peajeControlador.obtenerPeajes);
        this.apiRutaPeaje.put("/update", peajeControlador.actualizarPeaje);
        this.apiRutaPeaje.delete("/delete/:codPeaje", peajeControlador.eliminarPeaje);
    }

}
const peajeRuta = new PeajeRuta();
export default peajeRuta.apiRutaPeaje;        