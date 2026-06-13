import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    containerCentralizado: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    textoCarregando: {
        fontSize: 16,
        color: "#666666",
    },

    header: {
        alignItems: "center",
        marginBottom: 24,
    },

    botaoVoltar: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 21,
        backgroundColor: "#ffffff",
    },

    espacoHeader: {
        width: 42,
    },

    titulo: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    cardResumo: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eeeeee",
        marginBottom: 22,
    },

    resumoTitulo: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    valorTotal: {
        marginTop: 6,
        fontSize: 32,
        fontWeight: "800",
        color: "#007BFF",
    },

    secaoTitulo: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 12,
    },

    cardFilho: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#eeeeee",
        flexDirection: "row",
        alignItems: "center",
    },

    cardFilhoIcone: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#eaf3ff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    cardFilhoInfo: {
        flex: 1,
    },

    nomeFilho: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    emailFilho: {
        fontSize: 12,
        color: "#666666",
        marginTop: 3,
    },

    cardFilhoSaldo: {
        alignItems: "flex-end",
    },

    labelSaldo: {
        fontSize: 12,
        color: "#666666",
    },

    valorFilho: {
        fontSize: 16,
        fontWeight: "800",
        color: "#007BFF",
        marginTop: 4,
    },

    cardSaldo: {
        backgroundColor: "#ffffff",
        borderRadius: 18,
        padding: 28,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eeeeee",
        marginBottom: 18,
    },

    nomeUsuario: {
        marginTop: 12,
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    valorSaldo: {
        marginTop: 6,
        fontSize: 34,
        fontWeight: "800",
        color: "#007BFF",
    },

    cardInfo: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 18,
        borderWidth: 1,
        borderColor: "#eeeeee",
    },

    infoTitulo: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 8,
    },

    infoTexto: {
        fontSize: 14,
        color: "#666666",
        lineHeight: 20,
    },
    historicoTitulo: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
        marginTop: 22,
        marginBottom: 12,
    },

    cardMovimentacao: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#eeeeee",
        flexDirection: "row",
        alignItems: "center",
    },

    movimentacaoIcone: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#f8f9fa",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    movimentacaoInfo: {
        flex: 1,
    },

    movimentacaoTitulo: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1a1a1a",
    },

    movimentacaoDescricao: {
        fontSize: 12,
        color: "#666666",
        marginTop: 3,
    },

    movimentacaoData: {
        fontSize: 12,
        color: "#999999",
        marginTop: 3,
    },

    movimentacaoValorEntrada: {
        fontSize: 15,
        fontWeight: "800",
        color: "#28a745",
    },

    movimentacaoValorSaida: {
        fontSize: 15,
        fontWeight: "800",
        color: "#dc3545",
    },
});
