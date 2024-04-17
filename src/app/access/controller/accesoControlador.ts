import { Request, Response } from "express";
import AccesoDao from "../dao/accesoDao";
import { Acceso } from "../../../model/acceso";


class AccesoControlador extends AccesoDao {

    public inicioSesion(req: Request, res: Response): void {
        let objAcceso: Acceso = req.body;
        AccesoControlador.sesion(res,objAcceso);
    }
}

const accesoControlador = new AccesoControlador();
export default accesoControlador;