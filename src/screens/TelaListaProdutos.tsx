import {useEffect, useMemo, useState} from 'react';
import {FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {theme} from "../theme/theme";
import {ProdutoItem} from "../components/ProdutoItem";
import NovoProdutoModal from "../components/NovoProdutoModal";
import {Produto} from "../types/Produto";

const CHAVE_HISTORICO = '@compre-bem:historico_busca';

type RootStackParamList = {
    ListaProdutos: undefined;
    DetalheProduto: { produtoId: number };
};

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ListaProdutos'>;
    produtos: Produto[];
    onAdicionarProduto: (produto: Produto) => void;
};

export default function TelaListaProdutos({navigation, produtos, onAdicionarProduto}: Props) {
    const [busca, setBusca] = useState('');
    const [historico, setHistorico] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

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
                onSave={onAdicionarProduto}
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
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
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
            <FlatList
                contentContainerStyle={styles.listaContainer}
                data={produtosFiltrados}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (                    <ProdutoItem
                        produto={item}
                        onPress={() =>
                            navigation.navigate('DetalheProduto', {produtoId: item.id})
                        }
                    />
                )}
            />
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
});