import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
class Seguridad {


    public verificarToken(req: Request, res: Response, next: NextFunction): any {

        if (!req.headers.authorization) {
            res.status(401).json({ respuesta: "Petición negada por el sistema de Seguridad" });
        } else {
            try {
                const token = req.headers.authorization.split(' ')[1] as string;
                const datosUsuario = jwt.verify(token, 'claveSuperSecreta');
            
                req.body.datosUsuario = datosUsuario;
                next();
            } catch (err) {
                res.status(401).json({ respuesta: "Intento de fraude" })
            }
        }
    }



}
const seguridad = new Seguridad();
export default seguridad;