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




}

const departamentoControlador = new DepartamentoControlador();
export default departamentoControlador;
