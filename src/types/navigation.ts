export type StatusTarefa =
    | "Concluída"
    | "Em Andamento"
    | "Em Aberto"
    | "Expirado";

export type Tarefa = {
  id: string;
  titulo: string;
  descricao?: string;
  dataLimite?: string;
  valor_recompensa?: number;
  concluida?: boolean;
  status?: StatusTarefa;
};

export type RootStackParamList = {
  Login: undefined;
  TelaCadastro: undefined;
  CadastroTarefa: { tarefaEditando?: Tarefa } | undefined;
  VincularFilho: undefined;
  ListaTarefas: { tarefaSalva?: Tarefa } | undefined;
};
