import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tipo_usuario")
export class TipoUsuario {
  @PrimaryGeneratedColumn({ name: "id_tipo" })
  idTipo: number;

  @Column({ name: "descricao", type: "varchar", nullable: false, unique: true })
  descricao: string;
}
