import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tarefa } from "./Tarefa";
import { Carteira } from "./Carteira";

@Entity("movimentacao")
export class Movimentacao {
  @PrimaryGeneratedColumn({ name: "id_movimentacao" })
  idMovimentacao: number;

  @Column({
    name: "tipo_movimentacao",
    type: "varchar",
    nullable: false,
  })
  tipoMovimentacao: "entrada" | "saida";

  @Column({ name: "data", type: "datetime", nullable: false })
  data: Date;

  @Column({ name: "valor", type: "real", nullable: false })
  valor: number;

  @Column({ name: "fk_tarefa_id", type: "int", nullable: true })
  fkTarefaId?: number;

  @Column({ name: "fk_carteira_id", type: "int", nullable: false })
  fkCarteiraId: number;

  @ManyToOne(() => Tarefa, (tarefa) => tarefa.movimentacoes)
  @JoinColumn({ name: "fk_tarefa_id", referencedColumnName: "idTarefa" })
  tarefa?: Tarefa;

  @ManyToOne(() => Carteira, (carteira) => carteira.movimentacoes)
  @JoinColumn({ name: "fk_carteira_id", referencedColumnName: "idCarteira" })
  carteira: Carteira;
}
