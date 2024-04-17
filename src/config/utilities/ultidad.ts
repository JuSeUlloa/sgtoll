import Usuario from "../../model/usuario";

class Utilidad {
    public static generarNombreAcceso(objUsuario: Usuario): string {
        let nombresUsuario = objUsuario.nombresUsuario.toLowerCase();
        let apellidosUsuario = objUsuario.apellidosUsuario.toLowerCase();
        let cadena = nombresUsuario.split(' ', 1)[0] + '.' + apellidosUsuario.split(' ', 1)[0];
        return cadena;
    }

}

export default Utilidad;