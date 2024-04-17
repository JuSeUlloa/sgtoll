import { Response } from "express";
import poolConection from "../../../config/connexion/conexionBD";
import Ruta from "../../../model/ruta";

class RutaDao {

    protected static async crearRuta(res: Response, objRuta: Ruta): Promise<any> {
        let RutaRepository = poolConection.getRepository(Ruta);

        RutaRepository
            .insert(objRuta).then((respuesta) => {
                res.status(200).json({ mensaje: "Save project", objeto: respuesta.raw });
            })
            .catch((err) => {
                res.status(400).json({ mensaje: "Error Save Route " });
            });
    }

    protected static async listarRutas(res: Response): Promise<any> {
        let RutaRepository = poolConection.getRepository(Ruta);
        RutaRepository.find()
            .then((respuesta) => {
                const arregloRutas = respuesta;
                res.status(200).json(arregloRutas);
            })
            .catch((err) => {
                console.log(err);

                res.status(400).json({ mensaje: "Error find Route " });
            });
    }

    protected static async modificarRuta(res: Response, objRuta: Ruta): Promise<any> {
        let RutaRepository = poolConection.getRepository(Ruta);
        RutaRepository.update({ codRuta: objRuta.codRuta }, objRuta)
            .then((respuesta) => {
                res.status(200).json({ mensaje: "Ruta actualizado", nuevo: objRuta });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ mensaje: "Error Update Route " });
            });
    }

    protected static async borrarRuta(res: Response, codRuta: number): Promise<any> {
        let RutaRepository = poolConection.getRepository(Ruta);
        RutaRepository.delete({ codRuta: codRuta },)
            .then((respuesta) => {
                res.status(200).json({ mensaje: "Ruta eliminado", respuesta: respuesta.affected });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ mensaje: "Error Delete Route " });
            });
    }

}

export default RutaDao;
