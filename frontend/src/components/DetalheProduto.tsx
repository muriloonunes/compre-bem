import {Produto} from "../types/Produto";
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import {theme} from "../theme/theme";


interface DetalheProdutoProps {
    produto: Produto | null;
    carregando: boolean;
    atualizando: boolean;
    erro: string | null;
    onAtualizar: () => void | Promise<void>;
}

export function DetalheProduto({produto, carregando, atualizando, erro, onAtualizar}: DetalheProdutoProps) {
    if (carregando) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary}/>
            </View>
        )
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={[
                styles.detalheScroll,
                (erro || !produto) && styles.scrollVazio
            ]}
            refreshControl={
                <RefreshControl
                    refreshing={atualizando}
                    onRefresh={onAtualizar}
                    tintColor={theme.colors.primary}
                    progressBackgroundColor={theme.colors.background}
                    colors={[theme.colors.primary]}
                />
            }
        >
            {erro || !produto ? (
                    <View>
                        <Text style={styles.erroText}>{erro}</Text>
                        <Text style={styles.dicaRefreshText}>Puxe para baixo para tentar novamente</Text>
                    </View>) :
                (
                    <View style={styles.cardDetalhe}>
                        <Text style={styles.nome}>{produto.nome}</Text>

                        <View style={styles.divisor}/>

                        <Text style={styles.label}>Categoria</Text>
                        <Text style={styles.categoria}>{produto.categoria}</Text>

                        <Text style={styles.label}>Preço</Text>
                        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>

                        <Text style={styles.label}>Descrição</Text>
                        <Text style={styles.descricao}>{produto.descricao}</Text>
                    </View>
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.lg,
    },
    erroText: {
        color: theme.colors.danger,
        fontSize: theme.fontSize.lg,
        textAlign: 'center',
    },
    dicaRefreshText: {
        color: theme.colors.text.muted,
        fontSize: theme.fontSize.sm,
        textAlign: 'center',
        marginTop: theme.spacing.sm,
    },
    detalheScroll: {
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing.xxl,
    },
    scrollVazio: {
        flexGrow: 1,
        justifyContent: 'center',
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
