import cifrado from "bcryptjs";

import { Response } from "express";
import { Acceso } from "../../../model/acceso";
import { SQL_ACCESO } from './../repository/acceso_sql';
import poolConection from "../../../config/connexion/conexionBD";
import GenerarTokenControlador from "../../shared/controller/generarTokenControlador";

class AccesoDao {

    protected static async sesion(res: Response, objAcceso: Acceso): Promise<any> {
        let accesoRepository = poolConection.getRepository(Acceso);

        let existe = await accesoRepository.findBy({ nombreAcceso: objAcceso.nombreAcceso });
        if (existe.length != 0) {
            let claveAcceso = existe[0].claveAcceso;
            objAcceso.codUsuario = existe[0].codUsuario;
            if (cifrado.compareSync(objAcceso.claveAcceso, claveAcceso)) {
                accesoRepository.query(SQL_ACCESO.DATOS_ACCESO, [objAcceso.codUsuario])
                    .then((respuesta) => {
                        const token = GenerarTokenControlador.procesarRespuesta(respuesta[0]);
                        res.status(200).json({ tokenApp: token });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json({ mensaje: "Fallo al acceder al sistema" })
                    });

            } else {
                res.status(400).json({ mensaje: "Contraseña no valida" })
            }

        } else {
            res.status(400).json({ mensaje: "Nombre de Acceso no valido" })
        }

    }

}

export default AccesoDao;