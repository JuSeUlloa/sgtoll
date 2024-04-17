import { Router } from "express";
import departamentoControlador from "../controller/departamentoControlador";

class DepartamentoRuta {
    public apiRutaDepartamento: Router;

    constructor() {
        this.apiRutaDepartamento = Router();
        this.cargarRutas();
    }

    private cargarRutas(): void {
        this.apiRutaDepartamento.post("/add", departamentoControlador.crearDepartamento);
        this.apiRutaDepartamento.get("/list", departamentoControlador.obtenerDepartamentos);
        this.apiRutaDepartamento.put("/update", departamentoControlador.actualizarDepartamento);
        this.apiRutaDepartamento.delete("/delete/:codDepartamento", departamentoControlador.eliminarDepartamento);
    }

}
const departamentoRuta = new DepartamentoRuta();
export default departamentoRuta.apiRutaDepartamento;        