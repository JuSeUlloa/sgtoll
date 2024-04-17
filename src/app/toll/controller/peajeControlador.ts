import { Request, Response } from "express";
import PeajeDao from "../dao/peajeDao";
import Peaje from "../../../model/peaje";
import rutasImagenes from "../../../config/domain/var_imagenes";
import { nanoid } from "nanoid";
import AdministrarImagen from "../../../config/utilities/administrarImagen";

class PeajeControlador extends PeajeDao {


    public crearPeaje(req: Request, res: Response): void {
        let objPeaje: Peaje = req.body;
        let tipoImagen = objPeaje.fotoPublicaPeaje.split('.')[1];
        let nombrePrivadoFoto = 'IMG_' + nanoid(10) + '.' + tipoImagen;

        objPeaje.fotoPrivadaPeaje = nombrePrivadoFoto;

        const rutaImagenSistema = rutasImagenes.rutaFotosSistema;
        AdministrarImagen.crearImagen(nombrePrivadoFoto, objPeaje.base64Peaje, rutaImagenSistema);
        PeajeControlador.crearPeaje(res, objPeaje);
    }

    public obtenerPeajes(req: Request, res: Response): void {
        PeajeControlador.listarPeajes(res);
    }
    public actualizarPeaje(req: Request, res: Response): void {
        delete req.body.datosUsuario;
        let objPeaje: Peaje = req.body;
        let tipoImagen = objPeaje.fotoPublicaPeaje.split('.')[1];
        let nombrePrivadoFoto = 'IMG_' + nanoid(10) + '.' + tipoImagen;
        objPeaje.fotoPrivadaPeaje = nombrePrivadoFoto;
        const rutaImagenSistema = rutasImagenes.rutaFotosSistema;

        AdministrarImagen.crearImagen(nombrePrivadoFoto, objPeaje.base64Peaje, rutaImagenSistema);
        delete objPeaje.base64Peaje;
        PeajeControlador.modificarPeaje(res, objPeaje);
    }

    public eliminarPeaje(req: Request, res: Response): void {
        let codPeaje = Number(req.params.codPeaje);
        if (!isNaN(codPeaje)) {
            PeajeControlador.borrarPeaje(res, codPeaje);
        } else {
            res.status(400).json({ mensaje: "codigo de Peaje no valido" })
        }
    }


}

const peajeControlador = new PeajeControlador();
export default peajeControlador;
