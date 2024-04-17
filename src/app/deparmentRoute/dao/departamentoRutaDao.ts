import { Response } from "express";
import DepartamentoRuta from "../../../model/departamentoRuta";
import poolConection from "../../../config/connexion/conexionBD";
class DepartamentoRutaDao {

    private static departamentoRutaRepository = poolConection.getRepository(DepartamentoRuta);

    protected static async crear(res: Response, objDepaRuta: DepartamentoRuta): Promise<any> {
        this.departamentoRutaRepository.insert(objDepaRuta)
            .then((respuesta) => {
                res.status(200).json({ mensaje: "Ruta departamento asignada correctamente" });
            }).catch((miErrorsito) => {
                res.status(400).json({ mensaje: "fallo al agregar" })
            })
    }

    protected static async consultar(res: Response): Promise<any> {
        this.departamentoRutaRepository.find()
            .then((respuesta) => {
                res.status(200).json(respuesta);
            }).catch((miErrorsito) => {
                res.status(400).json({ mensaje: "fallo al agregar" })
            })
    }

    protected static async obtenerPorDepartamento(res: Response, codDepartamento: number): Promise<any> {
        this.departamentoRutaRepository.findBy({ codDepartamento: codDepartamento })
            .then((respuesta) => {
                res.status(200).json(respuesta[0]);
            }).catch((miErrorsito) => {
                res.status(400).json({ mensaje: "fallo al consultar las rutas" })
            })
    }

    protected static async obtenerPorRuta(res: Response, codRuta: number): Promise<any> {
        this.departamentoRutaRepository.findBy({ codDepartamento: codRuta })
            .then((respuesta) => {
                res.status(200).json(respuesta[0]);
            }).catch((miErrorsito) => {
                res.status(400).json({ mensaje: "fallo al consultar los departamentos" })
            })
    }

    protected static async actualizarPorDepartamento(res: Response, objDepaRuta: DepartamentoRuta): Promise<any> {
        this.departamentoRutaRepository.update({ codDepartamentoRuta: objDepaRuta.codDepartamentoRuta }, objDepaRuta)
            .then((respuesta) => {
                res.status(200).json({ mensaje: "Departamento ruta Actualizado" })
            }).catch((miErrosito) => {
                res.status(400).json({ mensaje: "Fallo al  Actualizar el deparatamento ruta" })
            })
    }

    protected static async eliminarDepartamentoRuta(res: Response, codDepartamentoRuta: number): Promise<any> {
        this.departamentoRutaRepository.delete({ codDepartamentoRuta: codDepartamentoRuta })
            .then((respuesta) => {
                res.status(200).json({ mensaje: "Departamento ruta elminado", respuesta: respuesta.affected })
            }).catch(() => {
                res.status(400).json({ mensaje: " Fallo al eliminar el Departamento ruta" })
            })
    }

}

export default DepartamentoRutaDao;