import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tarefa } from "./Tarefa";

@Entity("status_tarefa")
export class StatusTarefa {
  @PrimaryGeneratedColumn({ name: "id_status" })
  idStatus: number;

  @Column({ name: "descricao", type: "varchar", nullable: false, unique: true })
  descricao: string;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.status)
  tarefas?: Tarefa[];
}
