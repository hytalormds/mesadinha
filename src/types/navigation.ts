import type { NavigatorScreenParams } from "@react-navigation/native";

export type StatusTarefa =
    | "Concluída"
    | "Em Andamento"
    | "Em Aberto"
    | "Expirado"
    | "Aguardando Aprovação"
    | "Recusada";

export type TipoUsuario = 1 | 2;
// 1 = Responsável/Pai
// 2 = Dependente/Filho

export type PapelFamilia = "responsavel" | "crianca";

export type TipoMovimentacao = "entrada" | "saida";

export type Usuario = {
    id_usuario: string;
    nome: string;
    email: string;
    senha?: string;
    id_tipo: TipoUsuario;
    papel?: PapelFamilia;
    familiaId?: number;
};

export type Familia = {
    id_familia: string;
    nome: string;
    fk_usuario_responsavel: string;
};

export type UsuarioFamilia = {
    id_usuario_familia: string;
    fk_usuario_id: string;
    fk_familia_id: string;
    papel: PapelFamilia;
};

export type Carteira = {
    id_carteira: string;
    saldo: number;
    fk_usuario_id: string;
};

export type Movimentacao = {
    id_movimentacao: string;
    tipo_movimentacao: TipoMovimentacao;
    data: string;
    valor: number;
    fk_tarefa_id?: string;
    fk_carteira_id: string;
};

export type Tarefa = {
    id: string;
    id_tarefa?: string;

    titulo: string;
    descricao?: string;
    dataLimite?: string;
    valor_recompensa?: number;
    concluida?: boolean;
    status?: StatusTarefa;
    recompensa_creditada?: boolean;

    fk_usuario_responsavel?: string;
    nome_usuario_responsavel?: string;

    fk_usuario_crianca?: string;
    nome_usuario_crianca?: string;

    fk_familia_id?: string;
};

export type MembroFamiliaComSaldo = {
    usuario: Usuario;
    carteira: Carteira;
    papel: PapelFamilia;
};

export type MainTabParamList = {
    ListaTarefas: { tarefaSalva?: Tarefa } | undefined;
    VincularFilho: undefined;
    Cofrinho: undefined;
    Familia: undefined;
};

export type RootStackParamList = {
    Login: undefined;
    TelaCadastro: undefined;
    MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
    CadastroTarefa: { tarefaEditando?: Tarefa } | undefined;
    VincularFilho: undefined;
    ListaTarefas: { tarefaSalva?: Tarefa } | undefined;
    Cofrinho: undefined;
    Familia: undefined;
};
