import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Tarefa } from "./Tarefa";
import { UsuarioFamilia } from "./UsuarioFamilia";

@Entity("familia")
export class Familia {
  @PrimaryGeneratedColumn({ name: "id_familia" })
  idFamilia: number;

  @Column({ name: "nome", type: "varchar", nullable: false })
  nome: string;

  @Column({
    name: "codigo_convite",
    type: "varchar",
    nullable: false,
    unique: true,
  })
  codigoConvite: string;

  @Column({ name: "fk_usuario_responsavel", type: "int", nullable: false })
  fkUsuarioResponsavel: number;

  @ManyToOne(() => User, (user) => user.familiasResponsavel)
  @JoinColumn({ name: "fk_usuario_responsavel", referencedColumnName: "id" })
  usuarioResponsavel: User;

  @OneToMany(() => UsuarioFamilia, (usuarioFamilia) => usuarioFamilia.familia)
  usuariosFamilia: UsuarioFamilia[];

  @OneToMany(() => Tarefa, (tarefa) => tarefa.familia)
  tarefas: Tarefa[];
}
