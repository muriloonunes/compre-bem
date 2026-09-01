import {Produto} from "../types/Produto";
import {ScrollView, StyleSheet, View, Text} from "react-native";
import {theme} from "../theme/theme";

export function DetalheProduto({ produto }: { produto: Produto }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.detalheScroll}>
            <View style={styles.cardDetalhe}>
                <Text style={styles.nome}>{produto.nome}</Text>

                <View style={styles.divisor} />

                <Text style={styles.label}>Categoria</Text>
                <Text style={styles.categoria}>{produto.categoria}</Text>

                <Text style={styles.label}>Preço</Text>
                <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>

                <Text style={styles.label}>Descrição</Text>
                <Text style={styles.descricao}>{produto.descricao}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    detalheScroll: {
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing.xxl,
    },
    cardDetalhe: {
        backgroundColor: theme.colors.cardBackground,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
        width: '100%',
    },
    nome: {
        fontSize: theme.fontSize.xxl,
        fontWeight: 'bold',
        color: theme.colors.text.title,
        marginBottom: theme.spacing.sm,
    },
    divisor: {
        height: 1,
        backgroundColor: theme.colors.cardBorder,
    },
    label: {
        fontSize: theme.fontSize.md,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.xs,
    },
    categoria: {
        fontSize: theme.fontSize.base,
        color: theme.colors.text.body,
        lineHeight: 22,
    },
    descricao: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text.muted,
        lineHeight: 20,
    },
    preco: {
        fontSize: theme.fontSize.sm,
        fontWeight: '600',
        color: theme.colors.primary,
        lineHeight: 18,
    },
});
