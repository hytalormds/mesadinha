import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Movimentacao } from "./Movimentacao";

@Entity("carteira")
export class Carteira {
  @PrimaryGeneratedColumn({ name: "id_carteira" })
  idCarteira: number;

  @Column({ name: "saldo", type: "real", nullable: false, default: 0 })
  saldo: number;

  @Column({ name: "fk_usuario_id", type: "int", nullable: false, unique: true })
  fkUsuarioId: number;

  @ManyToOne(() => User, (user) => user.carteiras)
  @JoinColumn({ name: "fk_usuario_id", referencedColumnName: "id" })
  usuario: User;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.carteira)
  movimentacoes: Movimentacao[];
}
