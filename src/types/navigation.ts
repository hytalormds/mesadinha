export type StatusTarefa =
    | "Concluída"
    | "Em Andamento"
    | "Em Aberto"
    | "Expirado";
export type TipoUsuario = 1 | 2; // 1 Para Pai/Responsável, 2 para filho

export type Usuario = {
    id_usuario: string;
    nome: string;
    email?: string;
    senha?: string;
    id_tipo: TipoUsuario;
};

export type Tarefa = {
    id: string;
    titulo: string;
    descricao?: string;
    dataLimite?: string;
    valor_recompensa?: number;
    concluida?: boolean;
    status?: StatusTarefa;

    fk_usuario_responsavel?: string;
    nome_usuario_responsavel?: string;
};

export type RootStackParamList = {
    Login: undefined;
    TelaCadastro: undefined;
    CadastroTarefa: { tarefaEditando?: Tarefa } | undefined;
    VincularFilho: undefined;
    ListaTarefas: { tarefaSalva?: Tarefa } | undefined;
};