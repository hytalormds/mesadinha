import { Familia } from "../../../infra/database/typeorm/mesadinha/entities/Familia";
import {
  PapelFamilia,
  UsuarioFamilia,
} from "../../../infra/database/typeorm/mesadinha/entities/UsuarioFamilia";

export interface CreateFamiliaParams {
  nome: string;
  codigoConvite: string;
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
  findByCodigoConvite(codigoConvite: string): Promise<Familia | null>;
  findMembershipByUserId(userId: number): Promise<UsuarioFamilia | null>;
}
