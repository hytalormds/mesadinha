import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Familia } from "./Familia";
import { User } from "./User";

export type PapelFamilia = "responsavel" | "crianca";

@Entity("usuario_familia")
export class UsuarioFamilia {
  @PrimaryGeneratedColumn({ name: "id_usuario_familia" })
  idUsuarioFamilia: number;

  @Column({ name: "fk_usuario_id", type: "int", nullable: false })
  fkUsuarioId: number;

  @Column({ name: "fk_familia_id", type: "int", nullable: false })
  fkFamiliaId: number;

  @Column({ name: "papel", type: "varchar", nullable: false })
  papel: PapelFamilia;

  @ManyToOne(() => User, (user) => user.usuariosFamilia)
  @JoinColumn({ name: "fk_usuario_id", referencedColumnName: "id" })
  usuario: User;

  @ManyToOne(() => Familia, (familia) => familia.usuariosFamilia)
  @JoinColumn({ name: "fk_familia_id", referencedColumnName: "idFamilia" })
  familia: Familia;
}
