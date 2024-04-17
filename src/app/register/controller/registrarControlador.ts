import { Request, Response } from "express";

import Usuario from "../../../model/usuario";
import RegistroDao from "../dao/registroDao";
import { Acceso } from "../../../model/acceso";
import Utilidad from "../../../config/utilities/ultidad";
import {nanoid} from "nanoid";




class RegistroControlador extends RegistroDao {


    public registroUsuario(req: Request, res: Response): void {
        let objUsuario: Usuario;
        let objAcceso: Acceso;

        objAcceso = req.body;
        objUsuario = req.body;

        objUsuario.identificacionUsuario = 'DOC_' + nanoid(10);
        objUsuario.rolUsuario = 'Empleado';

        objAcceso.nombreAcceso = Utilidad.generarNombreAcceso(objUsuario);
        /* res.status(200).json(objAcceso) */


        RegistroControlador.nuevoUsuario(res, objUsuario, objAcceso);

    }
}

const registroControlador = new RegistroControlador();
export default registroControlador;