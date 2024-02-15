import cors from "cors";
import morgan from "morgan";
import express from "express";


import rutaAPIDepartamento from "../../app/deparment/route/departamentoRuta";
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
        this.app.use("/api/private/department", rutaAPIDepartamento);
    }

    public iniciarServidor(): void {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("servidor funcionando en el puerto: ", this.app.get("PORT"));
        });
    }
}
export default Servidor;