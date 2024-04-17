import { Request, Response } from "express";
import DepartamentoDao from "../dao/departamentoDao";
import Departamento from "../../../model/departamento";

class DepartamentoControlador extends DepartamentoDao {

    public crearDepartamento(req: Request, res: Response): void {
        let objDepartamento: Departamento;
        objDepartamento = req.body;
        DepartamentoControlador.crearDepartamento(res, objDepartamento);
    }

    public obtenerDepartamentos(req: Request, res: Response): void {
        DepartamentoControlador.listarDepartamentos(res);
    }

    public actualizarDepartamento(req: Request, res: Response): void {
        let objDepartamento: Departamento;
        objDepartamento = req.body;
        DepartamentoControlador.modificarDepartamento(res, objDepartamento);
    }

    public eliminarDepartamento(req: Request, res: Response): void {
        let codDepartamento = Number(req.params.codDepartamento);
        if (!isNaN(codDepartamento)) {
            DepartamentoControlador.borrarDepartamento(res, codDepartamento);
        } else {
           res.status(400).json({mensaje:"codigo de departamento no valido"})
        }
    }


}

const departamentoControlador = new DepartamentoControlador();
export default departamentoControlador;
