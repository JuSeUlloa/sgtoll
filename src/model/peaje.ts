import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Ruta from "./ruta";



@Entity("peajes", { schema: "public" })
class Peaje {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_peaje" })
    public codPeaje: number;

    @Column("integer", { name: "cod_ruta" })
    public codRuta: number;

    @Column("character varying", { name: "nombre_peaje", length: 200 })
    public nombrePeaje: string;

    @Column("character varying", { name: "foto_publica_peaje", length: 200 })
    public fotoPublicaPeaje: string;

    @Column("character varying", { name: "foto_privada_peaje", length: 200 })
    public fotoPrivadaPeaje: string;

    @ManyToOne(
        () => Ruta,
        (objRuta) => objRuta.peajes,
        { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
    )
    @JoinColumn([
        { name: "cod_ruta", referencedColumnName: "codRuta" },
    ])
    public codRutaP?: Ruta;


    public base64Peaje: string | any;

    constructor(cod: number, codR: number, nom: string, fotoPu: string, fotoPri: string, base: string) {
        this.codPeaje = cod;
        this.codRuta = codR;
        this.nombrePeaje = nom;
        this.fotoPublicaPeaje = fotoPu;
        this.fotoPrivadaPeaje = fotoPri;
        this.base64Peaje = base;
    }
}

export default Peaje;