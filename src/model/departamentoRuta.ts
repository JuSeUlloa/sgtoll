import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Departamento from "./departamento";
import Ruta from "./ruta";

@Entity("departamentos_rutas", { schema: "public" })
class DepartamentoRuta {

    @PrimaryGeneratedColumn({ type: "integer", name: "cod_departamento_ruta" })
    public codDepartamentoRuta: number;

    @Column("integer", { name: "cod_departamento" })
    public codDepartamento: number;

    @Column("integer", { name: "cod_ruta" })
    public codRuta: number;
    
    @Column("date", { name: "fecha_creacion_departamento_rut" })
    public fechaCreacionDepartamentoRuta: Date;



    @ManyToOne(
        () => Departamento,
        (objDepartamento) => objDepartamento.departamentoRuta,
        { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
    )
    @JoinColumn([
        { name: "cod_departamento", referencedColumnName: "codDepartamento" },
    ])
    public codDepartamentoR?: Departamento;

    @ManyToOne(() => Ruta, (objRuta) => objRuta.departamentoRuta, {
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
    })

    @JoinColumn([{ name: "cod_ruta", referencedColumnName: "codRuta" }])
    public codRutaD?: Ruta;

    constructor(cod: number, fec: Date, codDe: number, codRu: number) {
        this.codDepartamentoRuta = cod;
        this.fechaCreacionDepartamentoRuta = fec;
        this.codDepartamento = codDe;
        this.codRuta = codRu;
    }

}

export default DepartamentoRuta;