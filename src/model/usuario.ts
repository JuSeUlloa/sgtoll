import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Acceso } from "./acceso";

@Entity("usuarios", { schema: "public" })
class Usuario {
    @PrimaryGeneratedColumn({ type: "integer", name: "cod_usuario" })
    public codUsuario: number;

    @Column("character varying", { name: "identificacion_usuario", length: 20 })
    public identificacionUsuario: string;

    @Column("character varying", { name: "nombres_usuario", length: 250 })
    public nombresUsuario: string;

    @Column("character varying", { name: "apellidos_usuario", length: 250 })
    public apellidosUsuario: string;

    @Column("character varying", { name: "rol_usuario", length: 200 })
    public rolUsuario: string;

    @OneToOne(() => Acceso, (objAcceso) => objAcceso.codUsuarioA)
    acceso?: Acceso;

    /*
       @OneToMany(
          () => TurnosUsuarios,
          (turnosUsuarios) => turnosUsuarios.codUsuario2
      )
      turnosUsuarios: TurnosUsuarios[];
   */


    constructor(cod: number, nom: string, ape: string, ide: string, rol: string) {
        this.codUsuario = cod;
        this.nombresUsuario = nom;
        this.apellidosUsuario = ape;
        this.identificacionUsuario = ide;
        this.rolUsuario = rol;
    }

}


export default Usuario;