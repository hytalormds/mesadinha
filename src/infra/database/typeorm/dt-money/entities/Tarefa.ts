import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StatusTarefa } from "./StatusTarefa";
import { User } from "./User";
import { Movimentacao } from "./Movimentacao";

@Entity("tarefa")
export class Tarefa {
  @PrimaryGeneratedColumn({ name: "id_tarefa" })
  idTarefa: number;

  @Column({ name: "valor_recompensa", type: "real", nullable: false })
  valorRecompensa: number;

  @Column({ name: "data_limite", type: "datetime", nullable: true })
  dataLimite?: Date;

  @Column({ name: "titulo", type: "varchar", nullable: false })
  titulo: string;

  @Column({ name: "descricao", type: "varchar", nullable: true })
  descricao?: string;

  @Column({ name: "fk_status_tarefa", type: "int", nullable: false })
  fkStatusTarefa: number;

  @Column({ name: "fk_usuario_responsavel", type: "int", nullable: false })
  fkUsuarioResponsavel: number;

  @ManyToOne(() => StatusTarefa, (status) => status.tarefas)
  @JoinColumn({ name: "fk_status_tarefa", referencedColumnName: "idStatus" })
  status: StatusTarefa;

  @ManyToOne(() => User, (user) => user.tarefas)
  @JoinColumn({ name: "fk_usuario_responsavel", referencedColumnName: "id" })
  usuarioResponsavel: User;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.tarefa)
  movimentacoes?: Movimentacao[];
}
