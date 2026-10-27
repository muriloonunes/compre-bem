import {useCallback, useEffect, useMemo, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {theme} from "../theme/theme";
import {ProdutoItem} from "../components/ProdutoItem";
import NovoProdutoModal from "../components/NovoProdutoModal";
import {Produto} from "../types/Produto";
import {getProdutos} from "../service/produtoService";
import {RootStackParamList} from "../../App";

const CHAVE_HISTORICO = '@compre-bem:historico_busca';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ListaProdutos'>;
};

export default function TelaListaProdutos({navigation}: Props) {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [busca, setBusca] = useState('');
    const [historico, setHistorico] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const carregarProdutos = useCallback(async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            setErro(null);

            const resposta = await getProdutos();
            setProdutos(resposta.content ?? []);
        } catch (err: any) {
            console.error('Erro ao buscar produtos:', err);
            setErro('Não foi possível carregar os produtos.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        carregarProdutos();
    }, [carregarProdutos]);

    useEffect(() => {
        AsyncStorage.getItem(CHAVE_HISTORICO).then((salvo) => {
            if (salvo) setHistorico(JSON.parse(salvo));
        });
    }, []);

    function salvarHistorico(termo: string) {
        const termoLimpo = termo.trim();
        if (!termoLimpo) return;

        setHistorico((atual) => {
            const semDuplicado = atual.filter((item) => item.toLowerCase() !== termoLimpo.toLowerCase());
            const novo = [termoLimpo, ...semDuplicado].slice(0, 5);
            AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(novo));
            return novo;
        });
    }

    function handleAdicionarProduto(novoProduto: Produto) {
        setProdutos((atuais) => [novoProduto, ...atuais]);
    }

    const produtosFiltrados = useMemo(() => {
        return produtos.filter((produto) =>
            produto.nome.toLowerCase().includes(busca.toLowerCase())
        );
    }, [busca, produtos]);

    return (
        <SafeAreaView style={styles.container}>
            <NovoProdutoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleAdicionarProduto}
            />
            <Text style={styles.titleText}>Catálogo</Text>
            <TextInput
                style={styles.inputBusca}
                placeholder="Buscar produtos"
                placeholderTextColor={theme.colors.text.placeholder}
                value={busca}
                onChangeText={setBusca}
                returnKeyType="search"
                onSubmitEditing={() => salvarHistorico(busca)}
            />

            {historico.length > 0 && (
                <View style={styles.historicoWrapper}>
                    <View style={styles.historicoHeader}>
                        <Text style={styles.historicoLabel}>Buscas recentes:</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.chipsContainer}>
                        {historico.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.chip}
                                onPress={() => setBusca(item)}
                            >
                                <Text style={styles.chipText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            <Pressable
                style={styles.floatingButton}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <MaterialDesignIcons name='plus' color={theme.colors.text.contrast} size={32}/>
            </Pressable>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary}/>
                </View>
            ) : erro && produtos.length === 0 ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{erro}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={() => carregarProdutos()}>
                        <Text style={styles.retryButtonText}>Tentar novamente</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    contentContainerStyle={styles.listaContainer}
                    data={produtosFiltrados}
                    keyExtractor={(item) => String(item.id)}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => carregarProdutos(true)}
                            tintColor={theme.colors.primary}
                            colors={[theme.colors.primary]}
                        />
                    }
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            {busca ? 'Nenhum produto encontrado.' : 'Nenhum produto disponível.'}
                        </Text>
                    }
                    renderItem={({item}) => (
                        <ProdutoItem
                            produto={item}
                            onPress={() =>
                                navigation.navigate('DetalheProduto', {produtoId: item.id})
                            }
                        />
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    floatingButton: {
        backgroundColor: theme.colors.primary,
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 40,
        right: 30,
        elevation: 5,
        shadowColor: theme.colors.shadow,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 999,
    },
    titleText: {
        color: theme.colors.text.title,
        fontSize: theme.fontSize.title,
        fontWeight: 'bold',
        marginLeft: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        width: '100%',
    },
    inputBusca: {
        backgroundColor: theme.colors.cardBackground,
        color: theme.colors.text.title,
        minHeight: 44,
        maxHeight: 50,
        height: 50,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.lg,
        fontSize: theme.fontSize.lg,
        marginHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
    },
    historicoWrapper: {
        marginHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
    },
    historicoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    historicoLabel: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.text.muted,
    },
    limparText: {
        fontSize: theme.fontSize.xs,
        color: theme.colors.danger,
    },
    chipsContainer: {
        gap: theme.spacing.xs,
        paddingVertical: 2,
    },
    chip: {
        backgroundColor: theme.colors.cardBackground,
        paddingVertical: 6,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.full,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
    },
    chipText: {
        color: theme.colors.text.body,
        fontSize: theme.fontSize.sm,
    },
    listaContainer: {
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing.xxl,
        width: '100%',
        alignSelf: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    errorText: {
        color: theme.colors.danger,
        fontSize: theme.fontSize.md,
        textAlign: 'center',
        marginBottom: theme.spacing.md,
    },
    retryButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
    },
    retryButtonText: {
        color: theme.colors.text.contrast,
        fontWeight: 'bold',
        fontSize: theme.fontSize.sm,
    },
    emptyText: {
        color: theme.colors.text.muted,
        fontSize: theme.fontSize.md,
        textAlign: 'center',
        marginTop: theme.spacing.xxl,
    },
});