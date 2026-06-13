import type { Tarefa, Usuario } from "@/types/navigation";
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

type DadosMontagemTarefa = {
    tarefaEditando?: Tarefa;
    titulo: string;
    descricao: string;
    dataLimite: string;
    valorRecompensa: string;
    usuarioResponsavel: Usuario;
    usuarioCrianca?: Usuario | null;
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

export function montarTarefaCadastro({
    tarefaEditando,
    titulo,
    descricao,
    dataLimite,
    valorRecompensa,
    usuarioResponsavel,
    usuarioCrianca,
}: DadosMontagemTarefa): Tarefa {
    const valorNumerico = converterMoedaParaNumero(valorRecompensa);

    const criancaId =
        usuarioCrianca?.id_usuario ??
        tarefaEditando?.fk_usuario_crianca ??
        tarefaEditando?.fk_usuario_responsavel;

    const nomeCrianca =
        usuarioCrianca?.nome ??
        tarefaEditando?.nome_usuario_crianca ??
        tarefaEditando?.nome_usuario_responsavel;

    return {
        ...tarefaEditando,
        id: tarefaEditando?.id ?? String(Date.now()),
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        dataLimite: dataLimite.trim(),
        valor_recompensa: valorNumerico,

        status: tarefaEditando?.status ?? "Em Aberto",
        concluida: tarefaEditando?.concluida ?? false,
        recompensa_creditada: tarefaEditando?.recompensa_creditada ?? false,

        fk_usuario_responsavel: usuarioResponsavel.id_usuario,
        nome_usuario_responsavel: usuarioResponsavel.nome,

        fk_usuario_crianca: criancaId,
        nome_usuario_crianca: nomeCrianca,
    };
}