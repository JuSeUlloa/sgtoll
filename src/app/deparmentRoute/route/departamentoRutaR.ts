import { Router } from "express";
import departamentoRutaControlador from "../controller/departamentoRutaControlador";

class DepartamentoRutaR {
    public apiDepartamentoRuta: Router;

    constructor() {
        this.apiDepartamentoRuta = Router();
        this.cargarRutas();
    }

    private cargarRutas() {
        this.apiDepartamentoRuta.post("/add", departamentoRutaControlador.crearDepartamentoRuta);
        this.apiDepartamentoRuta.get("/list", departamentoRutaControlador.consultarDepartamentoRuta);
        this.apiDepartamentoRuta.get("/allRoutes/:codDepartamento", departamentoRutaControlador.consultarRutasPorDepartamento);
        this.apiDepartamentoRuta.get("/allDepartment/:codRoute", departamentoRutaControlador.consultarDepartamentoRuta);
        this.apiDepartamentoRuta.put("/update", departamentoRutaControlador.actualizarDepartamentoRuta);
        this.apiDepartamentoRuta.delete("/delete/:codDepaRuta", departamentoRutaControlador.eliminarDepartamentosPorRuta);
    }
}
const departamentoRutaR = new DepartamentoRutaR();
export default departamentoRutaR.apiDepartamentoRuta;
