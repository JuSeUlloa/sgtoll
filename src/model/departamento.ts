import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import DepartamentoRuta from "./departamentoRuta";



@Entity("departamentos", { schema: "public" })
class Departamento {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_departamento" })
    public codDepartamento: number;

    @Column("character varying", { name: "nombre_departamento", length: 200 })
    public nombreDepartamento: string;

    @OneToMany(
        () => DepartamentoRuta,
        (objDepartamentoRuta) => objDepartamentoRuta.codDepartamento
    )
    public departamentoRuta?: DepartamentoRuta[];

    constructor(cod: number, nom: string) {
        this.codDepartamento = cod;
        this.nombreDepartamento = nom;
    }
}

export default Departamento;