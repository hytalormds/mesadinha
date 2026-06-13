import { converterMoedaParaNumero } from "@/utils/formatadores";
import { dataValida } from "@/utils/datas";

type DadosValidacaoTarefa = {
  titulo: string;
  descricao: string;
  dataLimite: string;
  valorRecompensa: string;
};

type ResultadoValidacao = {
  valido: boolean;
  mensagem?: string;
};

export function validarCadastroTarefa({
  titulo,
  descricao,
  dataLimite,
  valorRecompensa,
}: DadosValidacaoTarefa): ResultadoValidacao {
  if (!titulo.trim()) {
    return {
      valido: false,
      mensagem: "Digite o título da tarefa.",
    };
  }

  if (!descricao.trim()) {
    return {
      valido: false,
      mensagem: "Digite a descrição da tarefa.",
    };
  }

  if (!dataLimite.trim()) {
    return {
      valido: false,
      mensagem: "Digite a data limite da tarefa.",
    };
  }

  if (!dataValida(dataLimite)) {
    return {
      valido: false,
      mensagem: "Digite uma data válida no formato DD/MM/AAAA.",
    };
  }

  const valorNumerico = converterMoedaParaNumero(valorRecompensa);

  if (valorNumerico <= 0) {
    return {
      valido: false,
      mensagem: "Digite um valor de recompensa válido.",
    };
  }

  return {
    valido: true,
  };
}