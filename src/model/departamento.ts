import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";



@Entity("departamentos", { schema: "public" })
class Departamento {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_departamento" })
    public codDepartamento: number;

    @Column("character varying", { name: "nombre_departamento", length: 200 })
    public nombreDepartamento: string;

    /*  @OneToMany(
         () => DepartamentosRutas,
         (departamentosRutas) => departamentosRutas.codDepartamento
     )
     departamentosRutas: DepartamentosRutas[]; */

    constructor(cod: number, nom: string) {
        this.codDepartamento = cod;
        this.nombreDepartamento = nom;
    }
}

export default Departamento;