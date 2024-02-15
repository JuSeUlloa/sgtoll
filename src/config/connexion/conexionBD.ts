import "reflect-metadata";

import dotenv from "dotenv";
import { DataSource } from "typeorm";
import Departamento from "../../model/departamento";


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
    entities:[Departamento],
    logging: true,
    namingStrategy:new SnakeNamingStrategy()
});

poolConection.initialize()
    .then((conn) => {
        console.log("Conexion establecida con " + database);
    }).catch((err) => {
        console.log(err);
    })

export default poolConection;
