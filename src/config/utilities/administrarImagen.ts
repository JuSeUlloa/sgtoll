import fs from "fs";
import sharp from "sharp";
import deasync from "deasync";
import rutasImagenes from "../../config/domain/var_imagenes";

class AdministrarImagen {

    public static crearImagen(nombrePrivado: string, base64: string, rutaAlmacenarImagen: string): void {
        let decodificacion = base64.replace(/^data:image\/\w+;base64,/, "");
        fs.readdir(rutaAlmacenarImagen, (err) => {
            if (err) {
                fs.mkdirSync(rutaAlmacenarImagen, { recursive: true });
            }
            fs.writeFile(rutaAlmacenarImagen + nombrePrivado, decodificacion, { encoding: "base64" }, function () { });
        });
    }

    public static borrarImagen( rutaImagenBorrar: string): void {
        fs.unlink(rutaImagenBorrar, function (error) {
            if (error) {
                console.log("Fallo al borrar la imagen");
            }
        });
    }

    private static crearMiniatura(rutaImagenPrivada: string, imagenMiniatura: string, tamano: number): any {
        let esperar = true;
        const dataSharp = sharp(rutaImagenPrivada).resize({ width: tamano })
            .toFile(imagenMiniatura, (err) => {
                if (err) {
                } else {
                    esperar = false;
                }
            });
        while (esperar) {
            deasync.sleep(50);
        }
        return dataSharp;
    }

    public static cargarImagen(fotoPrivada: string, rutaImagenPrivada: string, tamano: number): string {
        let base64 = '';
        if (fs.existsSync(rutaImagenPrivada)) {
            let imagenMiniatura = rutasImagenes.rutaFotosTemporal + fotoPrivada;
            AdministrarImagen.crearMiniatura(rutaImagenPrivada, imagenMiniatura, tamano);
            base64 = fs.readFileSync(imagenMiniatura, 'base64');
            fs.unlinkSync(imagenMiniatura);
        } else {
            let rutaImagenError = rutasImagenes.fotoError;
            base64 = fs.readFileSync(rutaImagenError, 'base64');
        }
        return base64;
    }
}

export default AdministrarImagen;