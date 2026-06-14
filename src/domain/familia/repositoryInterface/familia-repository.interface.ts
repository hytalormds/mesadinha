import { Familia } from "../../../infra/database/typeorm/mesadinha/entities/Familia";
import { User } from "../../../infra/database/typeorm/mesadinha/entities/User";
import {
  PapelFamilia,
  UsuarioFamilia,
} from "../../../infra/database/typeorm/mesadinha/entities/UsuarioFamilia";

export interface CreateFamiliaParams {
  nome: string;
  fkUsuarioResponsavel: number;
}

export interface AddUsuarioFamiliaParams {
  fkUsuarioId: number;
  fkFamiliaId: number;
  papel: PapelFamilia;
}

export interface FamiliaRepositoryInterface {
  createFamilia(params: CreateFamiliaParams): Promise<Familia>;
  addUsuarioFamilia(
    params: AddUsuarioFamiliaParams,
  ): Promise<UsuarioFamilia>;
  findMembershipByUserId(userId: number): Promise<UsuarioFamilia | null>;
  findChildrenByFamiliaId(familiaId: number): Promise<User[]>;
}
