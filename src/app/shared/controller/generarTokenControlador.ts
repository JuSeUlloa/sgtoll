
import jwt from "jsonwebtoken";

class GenerarTokenControlador {
    public static procesarRespuesta(registro: any): string {
        const token = jwt.sign(
            {
                id: registro.cod_usuario,
                correoAcceso: registro.nombre_acceso,
                nombresUsuario: registro.nombres_usuario,
                apellidosUsuario: registro.apellidos_usuario,
            },
            "claveSuperSecreta",
            { expiresIn: "14h" }
        );
        

        return token;
    }
}
export default GenerarTokenControlador;