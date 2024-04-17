import { Response } from "express";
import poolConection from "../../../config/connexion/conexionBD";
import Departamento from "../../../model/departamento";


class DepartamentoDao {


    protected static async crearDepartamento(res: Response, objDepartamento: Departamento): Promise<any> {
        let departamentoRepository = poolConection.getRepository(Departamento);

        departamentoRepository
            .insert(objDepartamento).then((respuesta) => {
                res.status(200).json({ mensaje: "Save project", objeto: respuesta.raw });
            })
            .catch((err) => {
                res.status(400).json({ mensaje: "Error Save Department " });
            });
    }

    protected static async listarDepartamentos(res: Response): Promise<any> {
        let departamentoRepository = poolConection.getRepository(Departamento);
        departamentoRepository.find()
            .then((respuesta) => {
                const arregloDepartamentos = respuesta;
                res.status(200).json(arregloDepartamentos);
            })
            .catch((err) => {
                console.log(err);

                res.status(400).json({ mensaje: "Error find Department " });
            });
    }
    protected static async modificarDepartamento(res: Response, objDepartamento: Departamento): Promise<any> {
        let departamentoRepository = poolConection.getRepository(Departamento);
        departamentoRepository.update({ codDepartamento: objDepartamento.codDepartamento }, objDepartamento)
            .then((respuesta) => {
                res.status(200).json({ mensaje: "Departamento actualizado", nuevo: objDepartamento });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ mensaje: "Error Update Department " });
            });
    }

    protected static async borrarDepartamento(res: Response, codDepartamento: number): Promise<any> {
        let departamentoRepository = poolConection.getRepository(Departamento);
        departamentoRepository.delete({ codDepartamento: codDepartamento },)
            .then((respuesta) => {
                res.status(200).json({ mensaje: "Departamento eliminado", respuesta: respuesta.affected });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ mensaje: "Error Delete Department " });
            });
    }

}

export default DepartamentoDao;
