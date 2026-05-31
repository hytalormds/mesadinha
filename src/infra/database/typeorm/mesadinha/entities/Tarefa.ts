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
import { Familia } from "./Familia";

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

  @Column({ name: "fk_usuario_crianca", type: "int", nullable: false })
  fkUsuarioCrianca: number;

  @Column({ name: "fk_familia_id", type: "int", nullable: false })
  fkFamiliaId: number;

  @ManyToOne(() => StatusTarefa, (status) => status.tarefas)
  @JoinColumn({ name: "fk_status_tarefa", referencedColumnName: "idStatus" })
  status: StatusTarefa;

  @ManyToOne(() => User, (user) => user.tarefas)
  @JoinColumn({ name: "fk_usuario_responsavel", referencedColumnName: "id" })
  usuarioResponsavel: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "fk_usuario_crianca", referencedColumnName: "id" })
  usuarioCrianca: User;

  @ManyToOne(() => Familia, (familia) => familia.tarefas)
  @JoinColumn({ name: "fk_familia_id", referencedColumnName: "idFamilia" })
  familia: Familia;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.tarefa)
  movimentacoes?: Movimentacao[];
}
