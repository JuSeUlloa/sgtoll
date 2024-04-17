import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import Usuario from "./usuario";

@Entity("accesos", { schema: "public" })
export class Acceso {
    @Column("integer", { primary: true, name: "cod_usuario" })
    public codUsuario: number;

    @Column("character varying", { name: "nombre_acceso", length: 250 })
    public nombreAcceso: string;

    @Column("character varying", { name: "clave_acceso", length: 500 })
    public claveAcceso: string;

    @OneToOne(() => Usuario, (objUsuario: Usuario) => objUsuario.acceso, {
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
    })
    
    @JoinColumn([{ name: "cod_usuario", referencedColumnName: "codUsuario" }])
    codUsuarioA?: Usuario;


    constructor(codU: number, nom: string, cla: string) {
        this.codUsuario = codU;
        this.nombreAcceso = nom;
        this.claveAcceso = cla;
    }
}