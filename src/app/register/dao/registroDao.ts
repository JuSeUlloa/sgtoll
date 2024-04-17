import { Response } from "express";

import Usuario from "../../../model/usuario";
import { Acceso } from "../../../model/acceso";
import poolConection from "../../../config/connexion/conexionBD";
import cifrar from "bcryptjs";
import { SQL_REGISTRO } from "../repository/usuario_sql";
import GenerarTokenControlador from "../../shared/controller/generarTokenControlador";

class RegistroDao {



    protected static async nuevoUsuario(res: Response, objUsuario: Usuario, objAcceso: Acceso): Promise<any> {
        const accesoRepository = poolConection.getRepository(Acceso);
        const usuairoRepository = poolConection.getRepository(Usuario);
        let accion = 1, codUsuario = 0;

        const usuarioAcceso = await accesoRepository.findBy({ nombreAcceso: objAcceso.nombreAcceso });
        if (usuarioAcceso.length == 0) {
            codUsuario = ((await usuairoRepository.insert(objUsuario)).identifiers[0].codUsuario);
            const cifrada = cifrar.hashSync(objAcceso.claveAcceso as string);
            objAcceso.codUsuario = codUsuario;
            objAcceso.claveAcceso = cifrada;
            await accesoRepository.insert(objAcceso);
            accion = 2;
        }
        console.log(codUsuario);

        usuairoRepository.query(SQL_REGISTRO.DATOS, [codUsuario]).then((respuesta) => {
            console.log(respuesta);
            switch (accion) {
                case 1:
                    res.status(400).json({ mensaje: "nombre de Acceso ya existe" });
                    break;
                case 2:
                    const token = GenerarTokenControlador.procesarRespuesta(respuesta[0]);
                    res.status(200).json({ tokenApp: token });
                    break;
            }
        }).catch((err) => {
            res.status(400).json({ mensaje: "Error to Register User" });
        })

    }

}

export default RegistroDao; 