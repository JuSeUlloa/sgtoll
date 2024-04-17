import { Response } from "express";
import poolConection from "../../../config/connexion/conexionBD";
import Peaje from "../../../model/peaje";
import AdministrarImagen from "../../../config/utilities/administrarImagen";
import rutasImagenes from "../../../config/domain/var_imagenes";

class PeajeDao {

    private static peajeRepository = poolConection.getRepository(Peaje);

    protected static async crearPeaje(res: Response, objPeaje: Peaje): Promise<any> {
        this.peajeRepository.insert(objPeaje).then((respuesta) => {
            res.status(200).json({ mensaje: "Save project", objeto: respuesta.raw });
        })
            .catch((err) => {
                res.status(400).json({ mensaje: "Error Save Toll " });
            });
    }

    protected static async listarPeajes(res: Response): Promise<any> {
        const rutaImagenPrivada = rutasImagenes.rutaFotosSistema;
        this.peajeRepository.find()
            .then((respuesta) => {
                const arregloPeajes = respuesta;
                arregloPeajes.map((objPeaje) => {
                    let fotoPrivada = objPeaje.fotoPrivadaPeaje;
                    const base64 = AdministrarImagen.cargarImagen(fotoPrivada,
                        rutaImagenPrivada + fotoPrivada, 500);
                    objPeaje.base64Peaje = base64;
                });
                res.status(200).json(arregloPeajes);
            })
            .catch((err) => {
                console.log(err);

                res.status(400).json({ mensaje: "Error find Toll " });
            });
    }

    protected static async modificarPeaje(res: Response, objPeaje: Peaje): Promise<any> {
        
        let encontrado = await this.peajeRepository.findOne({ where: { codPeaje: objPeaje.codPeaje } });
        if (encontrado) {
            const rutaImagenPrivada = rutasImagenes.rutaFotosSistema + encontrado.fotoPrivadaPeaje;
            AdministrarImagen.borrarImagen(rutaImagenPrivada);
            this.peajeRepository.update({ codPeaje: objPeaje.codPeaje }, objPeaje)
                .then((respuesta) => {
                    res.status(200).json({ mensaje: "Peaje actualizado", nuevo: objPeaje });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({ mensaje: "Error Update Toll " });
                });
        } else {
            res.status(400).json({ mensaje: "Don´t find Toll " });
        }
    }

    protected static async borrarPeaje(res: Response, codPeaje: number): Promise<any> {
        let encontrado = await this.peajeRepository.findOne({ where: { codPeaje: codPeaje } });
        if (encontrado) {
            const rutaImagenPrivada = rutasImagenes.rutaFotosSistema + encontrado.fotoPrivadaPeaje;
            AdministrarImagen.borrarImagen(rutaImagenPrivada);
            this.peajeRepository.delete({ codPeaje: codPeaje })
                .then((respuesta) => {
                    res.status(200).json({ mensaje: "Peaje eliminado", respuesta: respuesta.affected });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({ mensaje: "Error Delete Toll " });
                });
        } else {
            res.status(400).json({ mensaje: "Don´t find Toll " });
        }
    }

}

export default PeajeDao;
