import cors from "cors";
import morgan from "morgan";
import express from "express";

import rutaAPIRegistro from "../../app/register/route/registroRuta";
import rutaAPIAcceso from "../../app/access/route/accesoRuta";

import rutaAPIRoute from "../../app/route/route/rutaRoute";
import rutaAPIDepartamento from "../../app/deparment/route/departamentoRuta";
import rutaAPIDepaRuta from "../../app/deparmentRoute/route/departamentoRutaR";
import rutaAPIPeaje from "../../app/toll/route/peajeRuta";
import seguridad from "../../middleware/seguridad";

class Servidor {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.cargarConfiguracion();
        this.cargarRutas();
    }

    public cargarConfiguracion(): void {
        this.app.set("PORT", 3300);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json({ limit: "100mb" }));
        this.app.use(express.urlencoded({ extended: true }));
    }

    public cargarRutas(): void {
        this.app.use("/api/public/register", rutaAPIRegistro);
        this.app.use("/api/public/acces", rutaAPIAcceso);

        this.app.use("/api/private/department", seguridad.verificarToken, rutaAPIDepartamento);
        this.app.use("/api/private/departmentRoute", seguridad.verificarToken, rutaAPIDepaRuta);
        this.app.use("/api/private/toll", seguridad.verificarToken, rutaAPIPeaje);
        this.app.use("/api/private/route", seguridad.verificarToken, rutaAPIRoute);
    }

    public iniciarServidor(): void {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("servidor funcionando en el puerto: ", this.app.get("PORT"));
        });
    }
}
export default Servidor;