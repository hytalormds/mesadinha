import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tarefa } from "./Tarefa";
import { Carteira } from "./Carteira";
import { Familia } from "./Familia";
import { UsuarioFamilia } from "./UsuarioFamilia";

@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn({ name: "id_usuario" })
  id: number;

  @Column({ name: "nome", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "email", type: "varchar", nullable: false })
  email: string;

  @Column({ name: "senha", type: "varchar", nullable: false })
  password: string;

  @Column({ name: "id_tipo", type: "int", nullable: false })
  idTipo: number;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.usuarioResponsavel)
  tarefas: Tarefa[];

  @OneToMany(() => Carteira, (carteira) => carteira.usuario)
  carteiras: Carteira[];

  @OneToMany(() => Familia, (familia) => familia.usuarioResponsavel)
  familiasResponsavel: Familia[];

  @OneToMany(() => UsuarioFamilia, (usuarioFamilia) => usuarioFamilia.usuario)
  usuariosFamilia: UsuarioFamilia[];
}
