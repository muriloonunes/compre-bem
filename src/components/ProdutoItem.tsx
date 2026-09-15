import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {Produto} from '../types/Produto';
import {theme} from "../theme/theme";

export function ProdutoItem({
                                produto,
                                onPress,
                            }: {
    produto: Produto;
    onPress: () => void;
}) {
    const [favorito, setFavorito] = useState(false);
    const [quantidade, setQuantidade] = useState(0);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.headerRow}>
                <Image
                    source={{uri: produto.imagem}}
                    style={styles.imagem}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.nome}>{produto.nome}</Text>
                    <Text style={styles.categoria}>{produto.categoria}</Text>
                </View>
            </View>

            <Text style={styles.descricao}>{produto.descricao}</Text>

            <View style={styles.footer}>
                <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        onPress={() => setFavorito(!favorito)}
                        style={styles.favoritoButton}
                    >
                        <Text
                            style={[
                                styles.favoritoIcon,
                                {color: favorito ? theme.colors.danger : theme.colors.text.muted}
                            ]}
                        >
                            {favorito ? '♥' : '♡'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setQuantidade(Math.max(0, quantidade - 1))}
                        style={styles.quantidadeButton}
                    >
                        <Text style={styles.quantidadeButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantidadeText}>
                        {quantidade}
                    </Text>
                    <TouchableOpacity
                        onPress={() => setQuantidade(quantidade + 1)}
                        style={styles.quantidadeButton}
                    >
                        <Text style={styles.quantidadeButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        minHeight: 44,
        backgroundColor: theme.colors.cardBackground,
        borderRadius: theme.borderRadius.lg,
        padding: 10,
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
    },
    headerRow: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    imagem: {
        width: 64,
        aspectRatio: 1,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.cardBorder,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    nome: {
        fontSize: theme.fontSize.xl,
        fontWeight: 'bold',
        color: theme.colors.text.title,
        marginBottom: theme.spacing.sm,
    },
    categoria: {
        fontSize: theme.fontSize.md,
        color: theme.colors.text.body,
        marginBottom: 6,
        lineHeight: 20,
    },
    descricao: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text.muted,
        marginBottom: 6,
        lineHeight: 18,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.cardBorder,
    },
    preco: {
        fontSize: theme.fontSize.xs,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    favoritoButton: {
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.cardBorder,
        borderRadius: theme.borderRadius.sm,
    },
    favoritoIcon: {
        fontSize: theme.fontSize.lg,
    },
    quantidadeButton: {
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.cardBorder,
        borderRadius: theme.borderRadius.sm,
    },
    quantidadeButtonText: {
        color: theme.colors.text.title,
        fontWeight: 'bold',
        fontSize: theme.fontSize.lg,
    },
    quantidadeText: {
        color: theme.colors.text.title,
        minWidth: 28,
        textAlign: 'center',
    },
});