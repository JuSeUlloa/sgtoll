/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     08/02/2024 16:08:06                          */
/*==============================================================*/


/*==============================================================*/
/* Table: accesos                                               */
/*==============================================================*/
create table accesos (
   cod_usuario          int4                 not null,
   nombre_acceso        varchar(250)         not null,
   clave_acceso         varchar(500)         not null,
   constraint pk_accesos primary key (cod_usuario)
);

-- set table ownership
alter table accesos owner to user_node
;
/*==============================================================*/
/* Table: departamentos                                         */
/*==============================================================*/
create table departamentos (
   cod_departamento     serial               not null,
   nombre_departamento  varchar(200)         not null,
   constraint pk_departamentos primary key (cod_departamento)
);

-- set table ownership
alter table departamentos owner to user_node
;
/*==============================================================*/
/* Table: departamentos_rutas                                   */
/*==============================================================*/
create table departamentos_rutas (
   cod_departamento_ruta serial               not null,
   cod_ruta             int4                 not null,
   cod_departamento     int4                 not null,
   fecha_creacion_departamento_ruta date                 not null,
   constraint pk_departamentos_rutas primary key (cod_departamento_ruta)
);

-- set table ownership
alter table departamentos_rutas owner to user_node
;
/*==============================================================*/
/* Table: peajes                                                */
/*==============================================================*/
create table peajes (
   cod_peaje            serial               not null,
   cod_ruta             int4                 not null,
   nombre_peaje         varchar(200)         not null,
   constraint pk_peajes primary key (cod_peaje)
);

-- set table ownership
alter table peajes owner to user_node
;
/*==============================================================*/
/* Table: puestos                                               */
/*==============================================================*/
create table puestos (
   cod_puesto           serial               not null,
   cod_peaje            int4                 not null,
   horario_puesto       varchar(200)         not null,
   constraint pk_puestos primary key (cod_puesto)
);

-- set table ownership
alter table puestos owner to user_node
;
/*==============================================================*/
/* Table: rutas                                                 */
/*==============================================================*/
create table rutas (
   cod_ruta             serial               not null,
   nombre_ruta          varchar(200)         not null,
   concesion_ruta       varchar(500)         not null,
   constraint pk_rutas primary key (cod_ruta)
);

-- set table ownership
alter table rutas owner to user_node
;
/*==============================================================*/
/* Table: turnos                                                */
/*==============================================================*/
create table turnos (
   cod_turno            serial               not null,
   dias_turno           varchar(200)         not null,
   hora_inicio_turno    time                 not null,
   hora_fin_turno       time                 not null,
   tipo_turno           int2                 not null
      constraint ckc_tipo_turno_turnos check (tipo_turno between 1 and 3),
   estado_turno         int2                 not null,
   constraint pk_turnos primary key (cod_turno)
);

comment on column turnos.tipo_turno is
'1. Ma�ana
2. Tarde
3. Noche';

-- set table ownership
alter table turnos owner to user_node
;
/*==============================================================*/
/* Table: turnos_usuarios                                       */
/*==============================================================*/
create table turnos_usuarios (
   cod_usuario          int4                 not null,
   cod_puesto           int4                 not null,
   cod_turno            int4                 not null,
   estado_turno_usuario int2                 not null,
   constraint pk_turnos_usuarios primary key (cod_usuario, cod_puesto, cod_turno)
);

-- set table ownership
alter table turnos_usuarios owner to user_node
;
/*==============================================================*/
/* Table: usuarios                                              */
/*==============================================================*/
create table usuarios (
   cod_usuario          serial               not null,
   identificacion_usuario varchar(20)          not null,
   nombres_usuario      varchar(250)         not null,
   apellidos_usuario    varchar(250)         not null,
   rol_usuario          varchar(200)         not null,
   constraint pk_usuarios primary key (cod_usuario)
);

-- set table ownership
alter table usuarios owner to user_node
;
alter table accesos
   add constraint fk_accesos_ref_usuarios foreign key (cod_usuario)
      references usuarios (cod_usuario)
      on delete cascade on update restrict;

alter table departamentos_rutas
   add constraint fk_departam_ref_rutas foreign key (cod_ruta)
      references rutas (cod_ruta)
      on delete restrict on update cascade;

alter table departamentos_rutas
   add constraint fk_departam_ref_departam foreign key (cod_departamento)
      references departamentos (cod_departamento)
      on delete restrict on update restrict;

alter table peajes
   add constraint fk_peajes_ref_rutas foreign key (cod_ruta)
      references rutas (cod_ruta)
      on delete restrict on update restrict;

alter table puestos
   add constraint fk_puestos_ref_peajes foreign key (cod_peaje)
      references peajes (cod_peaje)
      on delete restrict on update cascade;

alter table turnos_usuarios
   add constraint fk_turnos_u_ref_turnos foreign key (cod_turno)
      references turnos (cod_turno)
      on delete restrict on update cascade;

alter table turnos_usuarios
   add constraint fk_turnos_u_ref_usuarios foreign key (cod_usuario)
      references usuarios (cod_usuario)
      on delete restrict on update cascade;

alter table turnos_usuarios
   add constraint fk_turnos_u_ref_puestos foreign key (cod_puesto)
      references puestos (cod_puesto)
      on delete restrict on update cascade;

