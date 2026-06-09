export type Tarefa = {
  id: string;
  titulo: string;
  descricao?: string;
  dataLimite?: string;
  valor_recompensa?: number;
  concluida?: boolean;
};

export type RootStackParamList = {
  BemVindo: undefined;
  Login: undefined;
  TelaCadastro: undefined;
  CadastroTarefa: { tarefaEditando?: Tarefa } | undefined;
  VincularFilho: undefined;
  ListaTarefas: { tarefaSalva?: Tarefa } | undefined;
};
