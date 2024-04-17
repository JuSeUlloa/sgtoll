import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import DepartamentoRuta from "./departamentoRuta";
import Peaje from "./peaje";

@Entity("rutas", { schema: "public" })
class Ruta {

    @PrimaryGeneratedColumn({ type: "integer", name: "cod_ruta" })
    public codRuta: number;

    @Column("character varying", { name: "nombre_ruta", length: 200 })
    public nombreRuta: string;


    @Column("character varying", { name: "concesion_ruta", length: 500 })
    public concesionRuta: string;

    @OneToMany(
        () => DepartamentoRuta,
        (objDepartamentoRuta) => objDepartamentoRuta.codRuta
    )
    public departamentoRuta?: DepartamentoRuta[];

    @OneToMany(
        () => Peaje,
        (objPeaje) => objPeaje.codRuta
    )
    public peajes?: Peaje[];


    /* 
        @OneToMany(() => Peajes, (peajes) => peajes.codRuta)
      peajes: Peajes[]; */


    constructor(cod: number, nom: string, con: string) {
        this.codRuta = cod;
        this.nombreRuta = nom;
        this.concesionRuta = con;

    }

}


export default Ruta;