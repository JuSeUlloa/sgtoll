import "reflect-metadata";

import dotenv from "dotenv";
import { DataSource } from "typeorm";
import Departamento from "../../model/departamento";
import Ruta from "../../model/ruta";
import DepartamentoRuta from "../../model/departamentoRuta";
import { Acceso } from "../../model/acceso";
import Usuario from "../../model/usuario";
import Peaje from "../../model/peaje";


dotenv.config({ path: ".env" });

const database = String(process.env.DATABASE);
const user = String(process.env.USER_DB);
const password = String(process.env.PASSWORD);
const host = String(process.env.HOST);
const port = Number(process.env.PORT);
const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

const poolConection = new DataSource({
    type: "postgres",
    host: host,
    port: port,
    username: user,
    password: password,
    database: database,
    synchronize: true,
    entities:[Departamento, Ruta, DepartamentoRuta, Acceso, Usuario, Peaje],
    logging: true,
    namingStrategy:new SnakeNamingStrategy(),
    ssl:{
        rejectUnauthorized:false,
    }
});

poolConection.initialize()
    .then((conn) => {
        console.log("Conexion establecida con " + database);
    }).catch((err) => {
        console.log(err);
    })

export default poolConection;
