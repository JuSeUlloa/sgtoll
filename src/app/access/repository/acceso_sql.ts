export const SQL_ACCESO = {
    DATOS_ACCESO:
        "SELECT a.cod_usuario, u.nombres_usuario, u.apellidos_usuario, a.nombre_acceso \
          FROM accesos a INNER JOIN usuarios u on a.cod_usuario = u.cod_usuario \
          WHERE u.cod_usuario = $1",
};