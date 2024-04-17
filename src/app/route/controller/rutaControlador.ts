import { Request, Response } from "express";

import Ruta from "../../../model/ruta";
import RutaDao from "../dao/rutaDao";


class RutaControlador extends RutaDao {

    public crearRuta(req: Request, res: Response): void {
        let objRuta: Ruta;
        objRuta = req.body;
        RutaControlador.crearRuta(res, objRuta);
    }

    public obtenerRutas(req: Request, res: Response): void {
        RutaControlador.listarRutas(res);
    }

    public actualizarRuta(req: Request, res: Response): void {
        let objRuta: Ruta;
        objRuta = req.body;
        RutaControlador.modificarRuta(res, objRuta);
    }

    public eliminarRuta(req: Request, res: Response): void {
        let codRuta = Number(req.params.codRuta);
        if (!isNaN(codRuta)) {
            RutaControlador.borrarRuta(res, codRuta);
        } else {
            res.status(400).json({ mensaje: "codigo de Ruta no valido" })
        }
    }


}

const rutaControlador = new RutaControlador();
export default rutaControlador;
